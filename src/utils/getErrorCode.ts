import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'

const DEFAULT_ERROR_CODE = '0'

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): error is FetchBaseQueryError => !!error?.status

export const getErrorCode = (error?: FetchBaseQueryError | SerializedError) => {
  if (!error || !isFetchBaseQueryError(error)) {
    return DEFAULT_ERROR_CODE
  }

  if (typeof error.status === 'string' && error.status === 'PARSING_ERROR') {
    return error.originalStatus ?? DEFAULT_ERROR_CODE
  }

  return error.status ?? DEFAULT_ERROR_CODE
}
