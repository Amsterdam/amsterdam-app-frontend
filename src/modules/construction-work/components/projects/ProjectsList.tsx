import {memo, useCallback, useLayoutEffect, useMemo} from 'react'
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
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectTraits} from '@/modules/construction-work/components/shared/ProjectTraits'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {ProjectsItem} from '@/modules/construction-work/types'
import {useTheme} from '@/themes/useTheme'
import {Duration} from '@/types/duration'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {mapImageSources} from '@/utils/image/mapImageSources'
import { useAccessibilityAnnounce } from '@/hooks/accessibility/useAccessibilityAnnounce'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

const keyExtractor: (item: ProjectsItem, index: number) => string = project =>
  project.identifier

type ListItemProps = {
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
  navigation: NavigationProp<ConstructionWorkRouteName>
  project: ProjectsItem
  readArticles: ReadArticle[]
}

const ListItem = memo(
  ({getProjectTraits, navigation, project, readArticles}: ListItemProps) => {
    const parsedTraits = useMemo(() => {
      if (getProjectTraits) {
        const traits = getProjectTraits?.(project)
        const {recent_articles} = traits
        const recentArticlesIds = recent_articles?.map(r => r.identifier) ?? []
        const readArticlesIds = readArticles.map(r => r.id)
        const unreadArticlesLength = recentArticlesIds.filter(
          id => !readArticlesIds.includes(id),
        ).length

        return {...traits, unreadArticlesLength}
      }

      return {} as Partial<ProjectsItem> & {unreadArticlesLength?: number}
    }, [getProjectTraits, project, readArticles])
    const {followed, meter, strides, unreadArticlesLength} = parsedTraits

    const additionalAccessibilityLabel =
      getProjectTraits &&
      accessibleText(
        getAccessibleFollowingText(!!followed, unreadArticlesLength ?? 0),
        getAccessibleDistanceText(meter, strides),
      )
    const projectTraits = useCallback(
      () =>
        getProjectTraits ? (
          <ProjectTraits
            accessibilityLabel={additionalAccessibilityLabel}
            unreadArticlesLength={unreadArticlesLength}
            {...parsedTraits}
          />
        ) : null,
      // trick to prevent unnecessary rerenders because of parsedTraits being a new object without new values
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        additionalAccessibilityLabel,
        getProjectTraits,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...Object.values(parsedTraits),
        unreadArticlesLength,
      ],
    )

    const onPress = useCallback(
      () =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        }),
      [navigation, project.identifier],
    )

    const imageSource = useMemo(
      () => mapImageSources(project.images?.[0]?.sources),
      [project.images],
    )

    return (
      <ProjectCard
        additionalAccessibilityLabel={additionalAccessibilityLabel}
        imageSource={imageSource}
        Kicker={projectTraits}
        onPress={onPress}
        subtitle={project.subtitle ?? undefined}
        testID={`ConstructionWork${project.identifier}ProjectCard`}
        title={project.title}
      />
    )
  },
)

type ListEmptyMessageProps = {
  testID: string
  text: string
}

const ListEmptyMessage = ({testID, text}: ListEmptyMessageProps) => {
  const a11yAnnounce = useAccessibilityAnnounce({
    focusDelay: Duration.Normal,
    queue: true,
  })

  useLayoutEffect(() => {
    a11yAnnounce(text)
  }, [a11yAnnounce, text])

  return (
    <Box insetHorizontal="md">
      <EmptyMessage
        testID={testID}
        text={text}
      />
    </Box>
  )
}

type Props = {
  data?: ProjectsItem[]
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
  isError: boolean
  isLoading: boolean
  listHeader?: JSX.Element
  noResultsMessage?: string
  onItemsPerRowChange?: FlatGridProps<ProjectsItem>['onItemsPerRowChange']
  onViewableItemsChanged?: FlatGridProps<ProjectsItem>['onViewableItemsChanged']
  searchText?: string | undefined
}

export const ProjectsList = ({
  data,
  getProjectTraits,
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
        getProjectTraits={getProjectTraits}
        navigation={navigation}
        project={item}
        readArticles={readArticles}
      />
    ),
    [getProjectTraits, navigation, readArticles],
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
