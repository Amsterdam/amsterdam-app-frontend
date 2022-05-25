import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {PleaseWait, SomethingWentWrong} from '../../../../components/ui'
import {DeviceContext} from '../../../../providers'
import {useEnvironment} from '../../../../store'
import {layoutStyles} from '../../../../styles'
import {size} from '../../../../tokens'
import {Project} from '../../../../types'
import {mapImageSources} from '../../../../utils'
import {selectAddress} from '../../../address/addressSlice'
import {useGetProjectsQuery} from '../../projects.service'
import {ProjectCard} from '../project'
import {selectIsProjectsSearching} from './'

export const ProjectsByDate = () => {
  const {primary: address} = useSelector(selectAddress)
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()
  const device = useContext(DeviceContext)
  const itemDimension = 16 * size.spacing.md * Math.max(device.fontScale, 1)

  const isSearching = useSelector(selectIsProjectsSearching)

  const {
    data: projects = [],
    isLoading: projectsIsLoading,
    isError,
  } = useGetProjectsQuery({
    sortBy: 'publication_date',
    sortOrder: 'desc',
  })

  const environment = useEnvironment()

  if (projectsIsLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  if (address || isSearching || !projects.length) {
    return null
  }

  const renderItem = ({item: project}: {item: Project}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images[0].sources, environment)}
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
