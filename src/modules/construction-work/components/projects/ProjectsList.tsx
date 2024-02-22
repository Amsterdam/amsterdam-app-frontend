import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {memo, useCallback, useMemo} from 'react'
import {type ListRenderItem, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid, type FlatGridProps} from 'react-native-super-grid'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {TestProps} from '@/components/ui/types'
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
import {ProjectsItem} from '@/modules/construction-work/types/api'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'
import {LogProps, PiwikDimension} from '@/processes/piwik/types'
import {useTheme} from '@/themes/useTheme'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

const keyExtractor = ({id}: ProjectsItem) => id.toString()

type ListItemProps = {
  onPress: (id: number) => void
  project: ProjectsItem
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
  data?: ProjectsItem[]
  error?: FetchBaseQueryError | SerializedError
  isError: boolean
  isLoading: boolean
  listHeader?: React.JSX.Element
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
  error,
}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const {type: searchType, amount: searchResultAmount} = useSearchField()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const renderItem: ListRenderItem<ProjectsItem> = useCallback(
    ({item}) => (
      <ListItem
        logDimensions={{
          // TODO: Value uit searchField.provider halen -> Dit moet ook nog werkend gemaakt worden
          [PiwikDimension.searchTerm]: 'value',
          [PiwikDimension.searchType]: searchType,
          [PiwikDimension.searchResultAmount]: searchResultAmount.toString(),
        }}
        logName="ProjectSuggestionButton"
        onPress={(id: number) => {
          navigation.navigate(ConstructionWorkRouteName.project, {
            id,
            screenHeaderTitle: item.title,
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
      searchResultAmount,
      searchText,
      searchType,
    ],
  )

  if (isError) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={ConstructionWorkFigure}
        onPress={() => navigation.goBack()}
        testProps={{
          testID: 'ConstructionWorkError',
        }}
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
    marginTop: -UNINTENDED_SPACING_FROM_RN_SUPER_GRID,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
