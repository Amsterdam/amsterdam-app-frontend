import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext, SettingsContext} from '../../../providers'
import {useGetNearestProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {Project} from '../../../types'
import {mapImageSources} from '../../../utils'
import {Box, PleaseWait, SomethingWentWrong, Text} from '../../ui'
import {Gutter} from '../../ui/layout'
import {Address} from '../address'
import {ProjectCard, ProjectTraits} from '../project'
import {selectIsProjectsSearching} from './search/projectsSearchSlice'
import {config} from './'

export const Projects = () => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const device = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {settings} = useContext(SettingsContext)
  const {address} = {...settings}
  const isSearching = useSelector(selectIsProjectsSearching)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetNearestProjectsQuery({
    address: address?.centroid[1] ? '' : address?.adres ?? '',
    lat: address?.centroid[1] ?? 0,
    lon: address?.centroid[0] ?? 0,
    radius: config.nearestProjectsRadius,
  })

  if (isSearching) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (!address) {
    return <Address />
  }

  if (!projects.length) {
    return (
      <Box>
        <Text>Geen projecten in de buurt.</Text>
      </Box>
    )
  }

  const renderListHeader = () => (
    <>
      <Box insetHorizontal="md">
        <Text intro>Dichtbij {address.adres}</Text>
      </Box>
      <Gutter height="md" />
    </>
  )

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images[0].sources)}
      kicker={<ProjectTraits meter={project.meter} strides={project.strides} />}
      onPress={() =>
        navigation.navigate(routes.projectDetail.name, {
          id: project.identifier,
        })
      }
      style={layoutStyles.grow}
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )

  return (
    <FlatGrid
      data={projects}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListHeaderComponent={renderListHeader}
      renderItem={renderItem}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
