import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {skipToken} from '@reduxjs/toolkit/query/react'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {selectProjectSearchText} from './projectsByTextSlice'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {Gutter} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {sanitizeProjects} from '@/modules/construction-work/components/projects'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {useGetProjectsByTextQuery} from '@/modules/construction-work/construction-work.service'
import {
  ProjectsRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

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
        <Paragraph variant="small">{projects.length} zoekresultaten</Paragraph>
        <Gutter height="lg" />
      </Box>
      {projects.length === 0 ? (
        <Box insetHorizontal="md">
          <Title level="h1" text="Helaas…" />
          <Paragraph>
            We hebben geen projecten gevonden voor deze zoekterm.
          </Paragraph>
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
