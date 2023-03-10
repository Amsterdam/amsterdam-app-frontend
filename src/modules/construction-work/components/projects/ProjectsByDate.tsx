import {useCallback, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {
  config,
  ProjectsList,
  ProjectsListHeader,
  ProvideAddressButton,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {useInfiniteScroller} from '@/modules/construction-work/hooks'
import {ProjectsItem} from '@/modules/construction-work/types'

export const ProjectsByDate = () => {
  const {projectItemListPageSize} = config
  const [itemsPerRow, setItemsPerRow] = useState(1)
  const [viewableItemIndex, setViewableItemIndex] = useState(1)

  const page =
    Math.floor(
      ((viewableItemIndex ?? 0) * itemsPerRow + 1) / projectItemListPageSize,
    ) + 1
  const result = useInfiniteScroller(page, projectItemListPageSize)

  const onViewableItemsChanged = useCallback<
    NonNullable<FlatGridProps<ProjectsItem>['onViewableItemsChanged']>
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2)
      const foundIndex = viewableItems[middleIndex].index
      if (foundIndex) {
        setViewableItemIndex(foundIndex)
      }
    }
  }, [])

  const getProjectTraits: (project: ProjectsItem) => Partial<ProjectsItem> =
    useCallback(
      ({followed, recent_articles}) => ({
        followed,
        recent_articles,
      }),
      [],
    )

  if (!result?.data) {
    return null
  }

  return (
    <ProjectsList
      {...result}
      getProjectTraits={getProjectTraits}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          <ProvideAddressButton />
        </ProjectsListHeader>
      }
      onItemsPerRowChange={setItemsPerRow}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}
