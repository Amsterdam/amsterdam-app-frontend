import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParamList} from '@/app/navigation'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {sanitizeProjects} from '@/modules/construction-work/components/projects'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {useGetProjectsQuery} from '@/modules/construction-work/construction-work.service'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type ListItemProps = {
  navigation: StackNavigationProp<
    RootStackParamList & ConstructionWorkStackParams,
    ConstructionWorkRouteName
  >
  project: ProjectsItem
}

const ListItem = ({navigation, project}: ListItemProps) => {
  const environment = useEnvironment()

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
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

export const ProjectsByDate = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName
      >
    >()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery({
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
      ListEmptyComponent={
        <>
          <Box insetHorizontal="md">
            <EmptyMessage text="We hebben geen projecten gevonden." />
          </Box>
        </>
      }
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
