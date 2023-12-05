/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryDefinition,
  QueryStatus,
  skipToken,
} from '@reduxjs/toolkit/dist/query'
import {ApiEndpointQuery} from '@reduxjs/toolkit/dist/query/core/module'
import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {useSelector} from '@/hooks/redux/useSelector'
import {Paginated} from '@/types/api'

const getEmptyItems = <DummyItem>(
  length: number,
  baseIndex: number,
  defaultEmptyItem: DummyItem,
  keyName: keyof DummyItem,
) =>
  length > 0
    ? Array<DummyItem>(length)
        .fill(defaultEmptyItem)
        .map((el, index) => ({
          ...el,
          [keyName]: `dummy-${index + baseIndex}`,
        }))
    : []

export const useInfiniteScroller = <
  Item,
  DummyItem,
  QueryArgs extends Record<string, any>,
>(
  defaultEmptyItem: DummyItem,
  endpoint: ApiEndpointQuery<
    QueryDefinition<any, any, any, Paginated<Item>>,
    any
  >,
  keyName: keyof DummyItem,
  useQueryHook: UseQuery<QueryDefinition<any, any, any, Paginated<Item>>>,
  page = 1,
  pageSize = 10,
  queryParams?: QueryArgs,
) => {
  const reduxApiState = useSelector(state => state.api)

  const {
    data: previousData,
    isError: isErrorPreviousPage,
    isLoading: isLoadingPreviousPage,
  } = useQueryHook(
    page > 1
      ? {
          ...queryParams,
          page: page - 1,
        }
      : skipToken,
  )
  const {
    data: currentData,
    isError: isErrorCurrentPage,
    isLoading: isLoadingCurrentPage,
  } = useQueryHook({
    ...queryParams,
    page,
  })

  const {
    data: nextData,
    isError: isErrorNextPage,
    isLoading: isLoadingNextPage,
  } = useQueryHook({
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
        const {data, status} = endpoint.select({
          ...queryParams,
          page: index + 1,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        })({api: reduxApiState})
        // if there is no data, fill the page with empty items
        const pageData =
          data?.result && status === QueryStatus.fulfilled
            ? data?.result
            : getEmptyItems<DummyItem>(
                Math.min(pageSize, totalElements - index * pageSize),
                index * pageSize,
                defaultEmptyItem,
                keyName,
              )

        return [...acc, ...pageData]
      }, []) as Item[],
    isError: isErrorPreviousPage || isErrorCurrentPage || isErrorNextPage,
    isLoading:
      isLoadingPreviousPage || isLoadingCurrentPage || isLoadingNextPage,
  }
}
