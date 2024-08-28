import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

type RTKQueryAPI = Pick<
  BaseQueryApi,
  'endpoint' | 'getState' | 'type' | 'extra' | 'forced' | 'dispatch'
>

export type PrepareHeaders = (
  headers: Headers,
  api: Omit<RTKQueryAPI, 'dispatch'>,
) => Headers

export type AfterBaseQuerySuccessFn<T = unknown> = (
  result: QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>,
  api: RTKQueryAPI,
) => void | Promise<void>

export type AfterBaseQueryErrorFn<T = unknown> = (
  result: QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>,
  api: RTKQueryAPI,
  failRetry: (e?: unknown) => void,
) => void | Promise<void>
