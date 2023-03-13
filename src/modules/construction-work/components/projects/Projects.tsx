import {useCallback, useState} from 'react'
import {FlatGridProps} from 'react-native-super-grid'
import {useInfiniteScroller} from '@/hooks'
import {
  config,
  ProjectsList,
  ProjectsListHeader,
  SearchFieldNavigator,
} from '@/modules/construction-work/components/projects'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {
  projectsApi,
  useGetProjectsQuery,
} from '@/modules/construction-work/service'
import {ProjectsItem} from '@/modules/construction-work/types'
import {InfiniteScrollerQueryParams} from '@/types'

type Props = {
  HeaderButton: React.ReactNode
  getProjectTraits: (project: ProjectsItem) => Partial<ProjectsItem>
  queryParams: InfiniteScrollerQueryParams
}

const emptyProjectsItem = {
  active: false,
  content_html: '',
  content_text: '',
  district_id: 0,
  district_name: '',
  followed: false,
  identifier: '',
  images: null,
  last_seen: '',
  meter: 0,
  modification_date: '',
  publication_date: '',
  score: 0,
  source_url: '',
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

  const result = useInfiniteScroller<ProjectsItem>(
    emptyProjectsItem,
    projectsApi.endpoints.getProjects,
    'identifier',
    useGetProjectsQuery,
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
