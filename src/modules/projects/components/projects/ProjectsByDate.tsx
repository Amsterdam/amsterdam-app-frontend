import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {PleaseWait, SomethingWentWrong} from '../../../../components/ui'
import {DeviceContext} from '../../../../providers'
import {useEnvironment} from '../../../../store'
import {size} from '../../../../tokens'
import {Project} from '../../../../types'
import {mapImageSources} from '../../../../utils'
import {selectAddress} from '../../../address/addressSlice'
import {useGetProjectsQuery} from '../../projects.service'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ProjectCard} from '../project'
import {selectIsProjectsSearching} from './'

export const ProjectsByDate = () => {
  const {primary: address} = useSelector(selectAddress)
  const navigation =
    useNavigation<StackNavigationProp<ProjectsStackParams, ProjectsRouteName>>()
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
        navigation.navigate(ProjectsRouteName.projectDetail, {
          id: project.identifier,
        })
      }
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
