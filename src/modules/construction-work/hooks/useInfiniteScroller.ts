/* eslint-disable @typescript-eslint/no-explicit-any */
import {QueryDefinition, skipToken} from '@reduxjs/toolkit/dist/query'
import {ApiEndpointQuery} from '@reduxjs/toolkit/dist/query/core/module'
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {useSelector} from 'react-redux'
import {Paginated} from '@/modules/construction-work/types'
import {RootState} from '@/store'

const getEmptyItems = <T>(
  length: number,
  baseIndex: number,
  defaultEmptyItem: T,
  keyName: keyof T,
) =>
  length > 0
    ? Array<T>(length)
        .fill(defaultEmptyItem)
        .map((el, index) => ({
          ...el,
          [keyName]: (index + baseIndex).toString(),
        }))
    : []

export const useInfiniteScroller = <T>(
  defaultEmptyItem: T,
  endpoint: ApiEndpointQuery<QueryDefinition<any, any, any, Paginated<T>>, any>,
  keyName: keyof T,
  useQueryHook: UseQuery<QueryDefinition<any, any, any, Paginated<T>>>,
  page = 1,
  pageSize = 10,
  queryParams: Record<
    string,
    string | number | boolean | string[] | undefined
  > = {},
) => {
  const reduxState = useSelector((state: RootState) => state)

  const {data: previousData} = useQueryHook(
    page > 1
      ? {
          ...queryParams,
          page: page - 1,
        }
      : skipToken,
  )
  const {data: currentData} = useQueryHook({
    ...queryParams,
    page,
  })
  const {data: nextData} = useQueryHook({
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
      .reduce<unknown[]>((acc, _s, index) => {
        const data = endpoint.select({
          ...queryParams,
          page: index + 1,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        })(reduxState).data
        // if there is no data, fill the page with empty items
        const pageData =
          data?.result ??
          getEmptyItems<T>(
            Math.min(pageSize, totalElements - index * pageSize),
            index * pageSize,
            defaultEmptyItem,
            keyName,
          )
        return [...acc, ...pageData]
      }, []) as T[],
    isError: false,
    isLoading: true,
  }
}
