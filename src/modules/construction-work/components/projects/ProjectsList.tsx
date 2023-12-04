import {memo, useCallback, useMemo} from 'react'
import {ListRenderItem, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid, FlatGridProps} from 'react-native-super-grid'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {getAccessibleFollowingText} from '@/modules/construction-work/components/projects/utils/getAccessibleFollowingText'
import {getUnreadArticlesLength} from '@/modules/construction-work/components/projects/utils/getUnreadArticlesLength'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
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
  onPress: (id: number) => void
  project: ProjectsItem
  readArticles: ReadArticle[]
  showTraits: boolean
}

const ListItem = memo(
  ({byDistance, onPress, project, readArticles, showTraits}: ListItemProps) => {
    const {followed, meter, recent_articles, strides} = project

    const [additionalAccessibilityLabel, unreadArticlesLength] = useMemo(() => {
      if (!showTraits) {
        return []
      }

      const unreadLength = getUnreadArticlesLength(
        readArticles,
        recent_articles,
      )

      return [
        accessibleText(
          getAccessibleFollowingText(!!followed, unreadLength ?? 0),
          getAccessibleDistanceText(meter, strides),
        ),
        unreadLength,
      ]
    }, [followed, meter, readArticles, recent_articles, showTraits, strides])

    const {id, image, subtitle, title} = project

    return (
      <ProjectCard
        additionalAccessibilityLabel={additionalAccessibilityLabel}
        imageSource={image?.sources}
        onPress={() => onPress(id)}
        subtitle={subtitle ?? undefined}
        testID={`ConstructionWork${id}ProjectCard`}
        title={title}>
        {showTraits ? (
          <ProjectTraits
            accessibilityLabel={additionalAccessibilityLabel}
            byDistance={byDistance}
            project={project}
            unreadArticlesLength={unreadArticlesLength}
          />
        ) : undefined}
      </ProjectCard>
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
  searchText,
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
        onPress={(id: number) =>
          navigation.navigate(ConstructionWorkRouteName.project, {id})
        }
        project={item}
        readArticles={readArticles}
        showTraits={!searchText}
      />
    ),
    [byDistance, navigation, readArticles, searchText],
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
