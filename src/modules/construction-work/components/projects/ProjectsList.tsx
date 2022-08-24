import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {
  EmptyMessage,
  PleaseWait,
  SomethingWentWrong,
} from '@/components/ui/feedback'
import {
  getAccessibleDistanceText,
  getAccessibleFollowingText,
} from '@/modules/construction-work/components/projects'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/construction-work.slice'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {
  accessibleText,
  excludeListItemsFromList,
  mapImageSources,
} from '@/utils'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'

type ListItemProps = {
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
  navigation: StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
  project: ProjectsItem
  readArticles: ReadArticle[]
}

const ListItem = ({
  getProjectTraits,
  navigation,
  project,
  readArticles,
}: ListItemProps) => {
  const environment = useEnvironment()

  let projectTraits
  if (getProjectTraits) {
    const traits = getProjectTraits?.(project)
    const {followed, meter, recent_articles, strides} = traits

    const numOfUnreadArticles = excludeListItemsFromList(
      recent_articles?.map(r => r.identifier) ?? [],
      readArticles.map(r => r.id),
    ).length

    projectTraits = (
      <ProjectTraits
        accessibilityLabel={accessibleText(
          getAccessibleFollowingText(!!followed, numOfUnreadArticles),
          getAccessibleDistanceText(meter, strides),
        )}
        numOfUnreadArticles={numOfUnreadArticles}
        {...traits}
      />
    )
  }

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={projectTraits}
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

type ListEmptyMessageProps = {
  text: string
}

const ListEmptyMessage = ({text}: ListEmptyMessageProps) => (
  <Box insetHorizontal="md">
    <EmptyMessage text={text} />
  </Box>
)

type Props = {
  data?: ProjectsItem[]
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
  isError: boolean
  isLoading: boolean
  listHeader?: JSX.Element
  noResultsMessage?: string
}

export const ProjectsList = ({
  data = [],
  getProjectTraits,
  isError,
  isLoading,
  listHeader,
  noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const readArticles = useSelector(selectConstructionWorkReadArticles)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FlatGrid
      contentContainerStyle={{paddingBottom}}
      data={data}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={project => project.identifier}
      ListEmptyComponent={<ListEmptyMessage text={noResultsMessage} />}
      ListHeaderComponent={listHeader}
      renderItem={({item}) => (
        <ListItem
          getProjectTraits={getProjectTraits}
          navigation={navigation}
          project={item}
          readArticles={readArticles}
        />
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
