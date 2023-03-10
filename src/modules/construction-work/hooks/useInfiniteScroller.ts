import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useSelector} from 'react-redux'
import {Address} from '@/modules/address'
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
  subtitle: ' ',
  title: ' ',
}

const getEmptyProjectsItems = (length: number, baseIndex: number) =>
  length > 0
    ? Array<ProjectsItem>(length)
        .fill(emptyProjectsItem)
        .map((el, index) => ({
          ...el,
          identifier: (index + baseIndex).toString(),
        }))
    : []

export const useInfiniteScroller = (
  page = 1,
  pageSize = 10,
  address?: Address,
) => {
  const reduxState = useSelector((state: RootState) => state)

  const {
    centroid: [lon = 0, lat = 0],
    adres: addressText,
  } = address ?? {centroid: []}
  const addressParams = address
    ? {
        address: lat && lon ? '' : addressText,
        lat,
        lon,
      }
    : {}
  const queryParams = {
    ...addressParams,
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
  const totalPages =
    previousData?.page.totalPages ??
    currentData?.page.totalPages ??
    nextData?.page.totalPages ??
    page + 1

  return {
    // create an array of pages with data
    data: Array(totalPages)
      // fill the array with empty values
      .fill({})
      // map over the array and fill it with data
      .reduce<ProjectsItem[]>((acc, _s, index) => {
        const data = projectsApi.endpoints.getProjects.select({
          ...queryParams,
          page: index + 1,
        })(reduxState).data
        // if there is no data, fill the page with empty items
        const pageData =
          data?.result ??
          getEmptyProjectsItems(
            Math.min(pageSize, totalElements - index * pageSize),
            index * pageSize,
          )
        return [...acc, ...pageData]
      }, []),
    isError: false,
    isLoading: false,
  }
}
