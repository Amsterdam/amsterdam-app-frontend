import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParams} from '@/app/navigation'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {sanitizeProjects} from '@/modules/construction-work/components/projects'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {articlesMaxAgeInDays} from '@/modules/construction-work/config'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {mapImageSources} from '@/utils'

type ListItemProps = {
  navigation: StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
  project: ProjectsItem
}

const ListItem = ({navigation, project}: ListItemProps) => {
  const environment = useEnvironment()
  const {followed, recent_articles} = project

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={<ProjectTraits {...{followed, recent_articles}} />}
      onPress={() =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}

const ListEmptyMessage = () => (
  <Box insetHorizontal="md">
    <EmptyMessage text="We hebben geen werkzaamheden gevonden." />
  </Box>
)

export const ProjectsByDate = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery({
    articles_max_age: articlesMaxAgeInDays,
    fields: [
      'followed',
      'identifier',
      'images',
      'recent_articles',
      'subtitle',
      'title',
    ],
    sortBy: 'publication_date',
    sortOrder: 'desc',
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FlatGrid
      data={sanitizeProjects(projects)}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyExtractor={project => project.identifier}
      ListEmptyComponent={ListEmptyMessage}
      renderItem={({item}) => (
        <ListItem navigation={navigation} project={item} />
      )}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
