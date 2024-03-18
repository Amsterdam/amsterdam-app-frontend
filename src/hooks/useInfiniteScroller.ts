import {
  type BaseQueryFn,
  type EndpointDefinitions,
  type FetchArgs,
  type FetchBaseQueryError,
  type QueryDefinition,
  QueryStatus,
  skipToken,
} from '@reduxjs/toolkit/dist/query'
import type {ApiSlug} from '@/environment'
import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ApiEndpointQuery} from '@reduxjs/toolkit/dist/query/core/module'
import type {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {useSelector} from '@/hooks/redux/useSelector'

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

type QueryDef<Item, QueryArgs extends PaginationQueryArgs> = QueryDefinition<
  QueryArgs,
  BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>,
  string,
  Paginated<Item>
>

export const useInfiniteScroller = <
  Item,
  ItemOrDummyItem,
  QueryArgs extends PaginationQueryArgs,
>(
  defaultEmptyItem: ItemOrDummyItem,
  endpoint: ApiEndpointQuery<QueryDef<Item, QueryArgs>, EndpointDefinitions>,
  keyName: keyof ItemOrDummyItem,
  useQueryHook: UseQuery<QueryDef<Item, QueryArgs>>,
  page = 1,
  pageSize = 10,
  queryParams: QueryArgs = {} as QueryArgs,
) => {
  const reduxApiState = useSelector(state => state.api)

  const {
    data: previousData,
    isError: isErrorPreviousPage,
    isLoading: isLoadingPreviousPage,
    error: errorPreviousPage,
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
    error: errorCurrentPage,
  } = useQueryHook({
    ...queryParams,
    page,
  })

  const {
    data: nextData,
    isError: isErrorNextPage,
    isLoading: isLoadingNextPage,
    error: errorNextPage,
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
            : getEmptyItems<ItemOrDummyItem>(
                Math.min(pageSize, totalElements - index * pageSize),
                index * pageSize,
                defaultEmptyItem,
                keyName,
              )

        return [...acc, ...pageData]
      }, []) as ItemOrDummyItem[],
    error: errorPreviousPage || errorCurrentPage || errorNextPage,
    isError: isErrorPreviousPage || isErrorCurrentPage || isErrorNextPage,
    isLoading:
      isLoadingPreviousPage || isLoadingCurrentPage || isLoadingNextPage,
  }
}
