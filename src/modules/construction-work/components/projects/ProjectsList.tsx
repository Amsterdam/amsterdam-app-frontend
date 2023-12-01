import {memo, useCallback, useMemo} from 'react'
import {ListRenderItem, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid, FlatGridProps} from 'react-native-super-grid'
import {NavigationProp} from '@/app/navigation/types'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {getAccessibleFollowingText} from '@/modules/construction-work/components/projects/utils/getAccessibleFollowingText'
import {
  getBaseProjectTraits,
  getProjectTraits,
} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {getUnreadArticlesLength} from '@/modules/construction-work/components/projects/utils/getUnreadArticlesLength'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {
  ProjectTraits,
  ProjectTraitsProps,
} from '@/modules/construction-work/components/shared/ProjectTraits'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {ProjectsItem} from '@/modules/construction-work/types/api'
import {useTheme} from '@/themes/useTheme'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

const keyExtractor = ({id}: ProjectsItem) => id.toString()

type ListItemProps = {
  byDistance: boolean
  navigation: NavigationProp<ConstructionWorkRouteName>
  project: ProjectsItem
  readArticles: ReadArticle[]
}

const ListItem = memo(
  ({byDistance, navigation, project, readArticles}: ListItemProps) => {
    const parsedTraits = useMemo<ProjectTraitsProps>(() => {
      const traits = byDistance
        ? getProjectTraits(project)
        : getBaseProjectTraits(project)

      return {
        ...traits,
        unreadArticlesLength: getUnreadArticlesLength(
          readArticles,
          traits?.recent_articles,
        ),
      }
    }, [byDistance, project, readArticles])
    const {followed, meter, strides, unreadArticlesLength} = parsedTraits

    const additionalAccessibilityLabel = accessibleText(
      getAccessibleFollowingText(!!followed, unreadArticlesLength ?? 0),
      getAccessibleDistanceText(meter, strides),
    )
    const projectTraits = useCallback(
      () => (
        <ProjectTraits
          accessibilityLabel={additionalAccessibilityLabel}
          {...parsedTraits}
        />
      ),
      // trick to prevent unnecessary rerenders because of parsedTraits being a new object without new values
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        additionalAccessibilityLabel,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...Object.values(parsedTraits),
        unreadArticlesLength,
      ],
    )

    const onPress = useCallback(
      () =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.id,
        }),
      [navigation, project.id],
    )

    return (
      <ProjectCard
        additionalAccessibilityLabel={additionalAccessibilityLabel}
        imageSource={project.image?.sources}
        Kicker={projectTraits}
        onPress={onPress}
        subtitle={project.subtitle ?? undefined}
        testID={`ConstructionWork${project.id}ProjectCard`}
        title={project.title}
      />
    )
  },
)

type ListEmptyMessageProps = {
  testID: string
  text: string
}

const ListEmptyMessage = ({testID, text}: ListEmptyMessageProps) => (
  <Box insetHorizontal="md">
    <EmptyMessage
      testID={testID}
      text={text}
    />
  </Box>
)

type Props = {
  byDistance?: boolean
  data?: ProjectsItem[]
  isError: boolean
  isLoading: boolean
  listHeader?: JSX.Element
  noResultsMessage?: string
  onItemsPerRowChange?: FlatGridProps<ProjectsItem>['onItemsPerRowChange']
  onViewableItemsChanged?: FlatGridProps<ProjectsItem>['onViewableItemsChanged']
  searchText?: string | undefined
}

export const ProjectsList = ({
  byDistance = false,
  data,
  isError,
  isLoading,
  onItemsPerRowChange,
  onViewableItemsChanged,
  searchText = undefined,
  listHeader,
  noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE,
}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const renderItem: ListRenderItem<ProjectsItem> = useCallback(
    ({item}) => (
      <ListItem
        byDistance={byDistance}
        navigation={navigation}
        project={item}
        readArticles={readArticles}
      />
    ),
    [byDistance, navigation, readArticles],
  )

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
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        isLoading ? (
          <PleaseWait />
        ) : searchText !== '' ? (
          <ListEmptyMessage
            testID="ConstructionWorkListEmptyMessage"
            text={noResultsMessage}
          />
        ) : null
      }
      ListHeaderComponent={listHeader}
      onItemsPerRowChange={onItemsPerRowChange}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={renderItem}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
      style={styles.gridView}
      testID="ConstructionWorkProjectsList"
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
