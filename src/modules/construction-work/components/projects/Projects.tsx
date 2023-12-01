import {useCallback, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {SearchFieldNavigator} from '@/modules/construction-work/components/projects/SearchFieldNavigator'
import {config} from '@/modules/construction-work/components/projects/config'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {
  projectsApi,
  useProjectsQuery,
} from '@/modules/construction-work/service'
import {
  ProjectsEndpointName,
  ProjectsItem,
  ProjectsQueryArgs,
} from '@/modules/construction-work/types/api'

type Props = {
  HeaderButton: React.ReactNode
  byDistance?: boolean
  queryParams?: ProjectsQueryArgs
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
  byDistance = false,
  HeaderButton,
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

  const result = useInfiniteScroller<
    ProjectsQueryArgs,
    ProjectsItem,
    DummyProjectsItem
  >(
    emptyProjectsItem,
    projectsApi.endpoints[ProjectsEndpointName.projects],
    'id',
    useProjectsQuery,
    page,
    projectItemListPageSize,
    {
      article_max_age: recentArticleMaxAge,
      page_size: projectItemListPageSize,
      ...queryParams,
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
      byDistance={byDistance}
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
