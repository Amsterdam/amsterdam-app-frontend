import {useCallback, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {SearchFieldNavigator} from '@/modules/construction-work/components/projects/SearchFieldNavigator'
import {config} from '@/modules/construction-work/components/projects/config'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {
  projectsApi,
  useProjectsQuery,
} from '@/modules/construction-work/service'
import {
  ProjectsEndpointName,
  ProjectsItem,
} from '@/modules/construction-work/types/api'
import {InfiniteScrollerQueryParams} from '@/types/infiniteScroller'

type Props = {
  HeaderButton: React.ReactNode
  getProjectTraits: (project: ProjectsItem) => Partial<ProjectsItem>
  queryParams: InfiniteScrollerQueryParams
}

export type DummyProjectsItem = Omit<ProjectsItem, 'id'> & {
  id: string
}

const emptyProjectsItem: DummyProjectsItem = {
  followed: false,
  image: null,
  meter: 0,
  id: '',
  recent_articles: [],
  strides: 0,
  subtitle: ' ',
  title: ' ',
}

export const Projects = ({
  HeaderButton,
  getProjectTraits,
  queryParams,
}: Props) => {
  const {projectItemListPageSize} = config
  const [itemsPerRow, setItemsPerRow] = useState(1)
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(
    viewableItemIndex,
    itemsPerRow,
    projectItemListPageSize,
  )

  const result = useInfiniteScroller<ProjectsItem, DummyProjectsItem>(
    emptyProjectsItem,
    projectsApi.endpoints[ProjectsEndpointName.projects],
    'id',
    useProjectsQuery,
    page,
    projectItemListPageSize,
    {
      ...queryParams,
      page_size: projectItemListPageSize,
    },
  )

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

  return (
    <ProjectsList
      {...result}
      getProjectTraits={getProjectTraits}
      listHeader={
        <ProjectsListHeader>
          <SearchFieldNavigator />
          {HeaderButton}
        </ProjectsListHeader>
      }
      noResultsMessage="We hebben geen werkzaamheden gevonden."
      onItemsPerRowChange={setItemsPerRow}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  )
}
