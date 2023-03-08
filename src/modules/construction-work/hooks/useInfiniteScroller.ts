import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {
  projectsApi,
  useGetProjectsQuery,
} from '@/modules/construction-work/service'
import {ProjectsItem} from '@/modules/construction-work/types'
import {RootState} from '@/store'

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
  subtitle: null,
  title: 'lbgtrt',
}

const getEmptyProjectsItems = (length: number, baseIndex: number) =>
  length > 0
    ? new Array<ProjectsItem>(length)
        .fill(emptyProjectsItem)
        .map((el, index) => ({
          ...el,
          identifier: (index + baseIndex).toString(),
        }))
    : []

export const useInfiniteScroller = (
  type: 'date' | 'distance',
  page = 1,
  pageSize = 10,
) => {
  const reduxState = useSelector((state: RootState) => state)
  const queryParams = {
    articles_max_age: recentArticleMaxAge,
    fields: [
      'followed',
      'identifier',
      'images',
      'publication_date',
      'recent_articles',
      'subtitle',
      'title',
    ],
    page_size: pageSize,
  }

  const {data: previousData} = useGetProjectsQuery(
    page > 1
      ? {
          ...queryParams,
          page: page - 1,
        }
      : skipToken,
  )
  const {data: currentData} = useGetProjectsQuery({
    ...queryParams,
    page,
  })
  const {data: nextData} = useGetProjectsQuery({
    ...queryParams,
    page: page + 1,
  })

  const totalElements =
    previousData?.page.totalElements ??
    currentData?.page.totalElements ??
    nextData?.page.totalElements ??
    0

  const emptyPreviousElementsLength = (page - 2) * pageSize
  const emptyNextElementsLength = totalElements - page * pageSize

  const result = {
    data: [
      ...new Array(page + 1).reduce<ProjectsItem[]>(
        (acc, _s, index) => [
          ...acc,
          ...(projectsApi.endpoints.getProjects.select({
            ...queryParams,
            page: index + 1,
          })(reduxState).data?.result ?? []),
        ],
        [],
      ),
      ...getEmptyProjectsItems(emptyNextElementsLength, totalElements),
    ],
    isError: false,
    isLoading: false,
  }

  return result
}
