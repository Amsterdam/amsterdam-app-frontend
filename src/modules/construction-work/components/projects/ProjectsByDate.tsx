import {useCallback, useMemo, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {
  ProjectsList,
  ProjectsListHeader,
  ProvideAddressButton,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {useInfiniteScroller} from '@/modules/construction-work/hooks'
import {ProjectsItem} from '@/modules/construction-work/types'

const pageSize = 20

export const ProjectsByDate = () => {
  const [itemsPerRow, setItemsPerRow] = useState(1)
  const [index, setIndex] = useState(1)
  const page = useMemo(
    () => Math.floor(((index ?? 0) * itemsPerRow + 1) / pageSize) + 1,
    [index, itemsPerRow],
  )
  const result = useInfiniteScroller('date', page, pageSize)

  const onViewableItemsChanged = useCallback<
    NonNullable<FlatGridProps<ProjectsItem>['onViewableItemsChanged']>
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2)
      const foundIndex = viewableItems[middleIndex].index
      if (foundIndex) {
        setIndex(foundIndex)
      }
    }
  }, [])

  console.log(page)
  if (!result?.data) {
    return null
  }

  return (
    <ProjectsList
      {...result}
      getProjectTraits={({followed, recent_articles}) => ({
        followed,
        recent_articles,
      })}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          <ProvideAddressButton />
        </ProjectsListHeader>
      }
      onItemsPerRowChange={value => setItemsPerRow(value)}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}
