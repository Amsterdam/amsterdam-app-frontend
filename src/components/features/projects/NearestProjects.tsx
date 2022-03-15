import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {DeviceContext, SettingsContext} from '../../../providers'
import {useGetNearestProjectsQuery} from '../../../services'
import {layoutStyles} from '../../../styles'
import {size} from '../../../tokens'
import {Project} from '../../../types'
import {mapImageSources} from '../../../utils'
import {Box, PleaseWait, Text} from '../../ui'
import {Gutter} from '../../ui/layout'
import {Address} from '../address'
import {ProjectCard, ProjectTraits} from '../project'
import {config} from './'

export const NearestProjects = () => {
  const device = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  const {settings} = useContext(SettingsContext)
  const {address} = {...settings}

  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const {data: projects, isLoading} = useGetNearestProjectsQuery({
    address: address?.centroid[1] ? '' : address?.adres ?? '',
    lat: address?.centroid[1] ?? 0,
    lon: address?.centroid[0] ?? 0,
    radius: config.nearestProjectsRadius,
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (!address) {
    return <Address />
  }

  if (!projects?.length) {
    return (
      <Box>
        <Text>Geen projecten in de buurt.</Text>
      </Box>
    )
  }

  const listHeaderComponent = () => (
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
    <>
      <FlatGrid
        data={projects}
        itemContainerStyle={styles.itemContainer}
        itemDimension={itemDimension}
        keyExtractor={project => project.identifier}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
        spacing={size.spacing.md}
      />
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
