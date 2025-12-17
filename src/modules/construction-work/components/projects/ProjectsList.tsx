import {memo, useCallback, useMemo} from 'react'
import {type ListRenderItem, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid, type FlatGridProps} from 'react-native-super-grid'
import type {TestProps} from '@/components/ui/types'
import type {ProjectsItem} from '@/modules/construction-work/types/api'
import type {ProjectsListItem} from '@/modules/construction-work/types/project'
import type {SerializedError} from '@reduxjs/toolkit'
import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useSearchField} from '@/hooks/useSearchField'
import {getAccessibleDistanceText} from '@/modules/construction-work/components/projects/utils/getAccessibleDistanceText'
import {getAccessibleFollowingText} from '@/modules/construction-work/components/projects/utils/getAccessibleFollowingText'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  type ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'
import {type LogProps, PiwikDimension} from '@/processes/piwik/types'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'
import {useTheme} from '@/themes/useTheme'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

const keyExtractor = ({id}: ProjectsListItem) => id.toString()

type ListItemProps = {
  onPress: (id: number, isDummyItem?: boolean) => void
  project: ProjectsListItem
  readArticles: ReadArticle[]
  showTraits: boolean
} & LogProps

const ListItem = memo(
  ({
    onPress,
    project,
    readArticles,
    showTraits,
    ...logProps
  }: ListItemProps) => {
    const {followed, meter, recent_articles} = project

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
          getAccessibleDistanceText(meter),
        ),
        unreadLength,
      ]
    }, [followed, meter, readArticles, recent_articles, showTraits])

    const {id, image, isDummyItem, subtitle, title} = project

    return (
      <ProjectCard
        additionalAccessibilityLabel={additionalAccessibilityLabel}
        imageSource={image?.sources}
        isDummyItem={isDummyItem}
        onPress={() => onPress(id, isDummyItem)}
        subtitle={subtitle}
        testID={`ConstructionWork${id}ProjectCard`}
        title={title}
        {...logProps}>
        {showTraits ? (
          <ProjectTraits
            accessibilityLabel={additionalAccessibilityLabel}
            project={project}
            unreadArticlesLength={unreadArticlesLength}
          />
        ) : undefined}
      </ProjectCard>
    )
  },
)

type ListEmptyMessageProps = {
  text: string
} & TestProps

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
  data?: ProjectsListItem[]
  error?: FetchBaseQueryError | SerializedError
  isError: boolean
  isLoading: boolean
  listHeader?: React.JSX.Element
  noResultsMessage?: string
  onItemsPerRowChange?: FlatGridProps<ProjectsItem>['onItemsPerRowChange']
  onViewableItemsChanged?: FlatGridProps<ProjectsItem>['onViewableItemsChanged']
  searchText?: string
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
  error,
}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const {
    type: searchType,
    amount: searchResultAmount,
    setSearchFieldValue,
    value,
  } = useSearchField()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const renderItem: ListRenderItem<ProjectsListItem> = useCallback(
    ({item}) => (
      <ListItem
        logDimensions={{
          [PiwikDimension.searchTerm]: value,
          [PiwikDimension.searchType]: searchType,
          [PiwikDimension.searchResultAmount]: searchResultAmount.toString(),
        }}
        onPress={(id, isDummyItem) => {
          if (isDummyItem) {
            return
          }

          setSearchFieldValue('')
          navigation.navigate(ConstructionWorkRouteName.project, {
            id,
          })
        }}
        project={item}
        readArticles={readArticles}
        showTraits={!searchText && (byDistance || item.followed)}
      />
    ),
    [
      byDistance,
      navigation,
      readArticles,
      setSearchFieldValue,
      searchResultAmount,
      searchText,
      searchType,
      value,
    ],
  )

  const isInternetReachable = useSelector(selectIsInternetReachable)

  if (isError && !data?.length) {
    if (isInternetReachable === false) {
      return <NoInternetErrorFullScreen />
    }

    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={ConstructionWorkFigure}
        onPress={() => navigation.goBack()}
        testID="ConstructionWorkFullScreenError"
        title="Er zijn geen werkzaamheden beschikbaar"
      />
    )
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
          <PleaseWait testID="ConstructionWorkListLoadingSpinner" />
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
    paddingTop: -UNINTENDED_SPACING_FROM_RN_SUPER_GRID,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
