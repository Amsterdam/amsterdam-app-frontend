import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/query/react'
import {sanitizeProjects} from '_modules/construction-work/components/projects/utils/sanitizeProjects'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {
  Box,
  PleaseWait,
  SomethingWentWrong,
  Text,
  Title,
} from '../../../../components/ui'
import {Gutter} from '../../../../components/ui/layout'
import {DeviceContext} from '../../../../providers'
import {useEnvironment} from '../../../../store'
import {ProjectsItem} from '../../../../types'
import {mapImageSources} from '../../../../utils'
import {useGetProjectsByTextQuery} from '../../projects.service'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ProjectCard} from '../project'
import {selectProjectSearchText} from './projectsByTextSlice'
import {useTheme} from '@/themes'

export const ProjectsByText = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProjectsStackParams, ProjectsRouteName>>()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const searchText = useSelector(selectProjectSearchText)

  const params = searchText
    ? {
        fields: ['identifier', 'images', 'subtitle', 'title'],
        text: searchText,
        queryFields: ['subtitle', 'title'],
      }
    : undefined

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsByTextQuery(params ?? skipToken)

  const environment = useEnvironment()

  if (!searchText) {
    return null
  }

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  const renderListHeader = () => (
    <>
      <Box insetHorizontal="md">
        <Text intro>{projects.length} zoekresultaten</Text>
        <Gutter height="md" />
      </Box>
      {projects.length === 0 ? (
        <Box insetHorizontal="md">
          <Title level={3} text="Helaas…" />
          <Text>We hebben geen resultaten gevonden voor deze zoekterm.</Text>
        </Box>
      ) : null}
    </>
  )

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
