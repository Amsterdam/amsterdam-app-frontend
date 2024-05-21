import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

export type PrepareHeaders = (
  headers: Headers,
  api: Pick<
    BaseQueryApi,
    'endpoint' | 'getState' | 'type' | 'extra' | 'forced'
  >,
) => Headers

export type AfterBaseQueryFn<T = unknown> = (
  result: QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>,
  api: Pick<
    BaseQueryApi,
    'endpoint' | 'getState' | 'type' | 'extra' | 'forced' | 'dispatch'
  >,
) => void
