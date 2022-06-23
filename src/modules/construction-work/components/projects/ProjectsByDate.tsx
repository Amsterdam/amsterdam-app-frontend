import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {sanitizeProjects, selectIsProjectsSearching} from './'
import {PleaseWait, SomethingWentWrong} from '@/components/ui'
import {selectAddress} from '@/modules/address/addressSlice'
import {ProjectCard} from '@/modules/construction-work/components/project'
import {useGetProjectsQuery} from '@/modules/construction-work/projects.service'
import {
  ProjectsRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

export const ProjectsByDate = () => {
  const {primary: address} = useSelector(selectAddress)
  const navigation =
    useNavigation<StackNavigationProp<ProjectsStackParams, ProjectsRouteName>>()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

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

  const renderItem = ({item: project}: {item: ProjectsItem}) => (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      onPress={() =>
        navigation.navigate(ProjectsRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )

  return (
    <FlatGrid
      data={sanitizeProjects(projects)}
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
