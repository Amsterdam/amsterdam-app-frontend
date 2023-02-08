import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers'
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
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {accessibleText, mapImageSources} from '@/utils'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

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

    const recentArticlesIds = recent_articles?.map(r => r.identifier) ?? []
    const readArticlesIds = readArticles.map(r => r.id)
    const unreadArticlesLength = recentArticlesIds.filter(
      id => !readArticlesIds.includes(id),
    ).length

    projectTraits = (
      <ProjectTraits
        accessibilityLabel={accessibleText(
          getAccessibleFollowingText(!!followed, unreadArticlesLength),
          getAccessibleDistanceText(meter, strides),
        )}
        unreadArticlesLength={unreadArticlesLength}
        {...traits}
      />
    )
  }

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0]?.sources, environment)}
      kicker={projectTraits}
      onPress={() =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      testID={`ConstructionWorkCardProject${project.identifier}`}
      title={project.title}
    />
  )
}

type ListEmptyMessageProps = {
  testID: string
  text: string
}

const ListEmptyMessage = ({testID, text}: ListEmptyMessageProps) => (
  <Box insetHorizontal="md">
    <EmptyMessage {...{testID, text}} />
  </Box>
)

type Props = {
  data?: ProjectsItem[]
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
  isError: boolean
  isLoading: boolean
  listHeader?: JSX.Element
  noResultsMessage?: string
  searchText?: string | undefined
}

export const ProjectsList = ({
  data,
  getProjectTraits,
  isError,
  isLoading,
  searchText = undefined,
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

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FlatGrid
      contentContainerStyle={{paddingBottom}}
      data={data ?? []}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={project => project.identifier}
      ListEmptyComponent={
        isLoading ? (
          <PleaseWait />
        ) : searchText !== '' ? (
          <ListEmptyMessage
            testID="ConstructionWorkTextEmptyMessage"
            text={noResultsMessage}
          />
        ) : null
      }
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
      style={styles.gridView}
      testID="ConstructionWorkListProjects"
    />
  )
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: -UNINTENDED_SPACING_FROM_RN_SUPER_GRID,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
