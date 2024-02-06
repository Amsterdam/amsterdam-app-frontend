import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'

const isFetchBaseQueryError = (
  error?: FetchBaseQueryError | SerializedError,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): error is FetchBaseQueryError => !!error.status

export const getErrorCode = (error?: FetchBaseQueryError | SerializedError) => {
  if (!error || !isFetchBaseQueryError(error)) {
    return '0'
  }

  if (typeof error.status === 'string') {
    if (error.status === 'PARSING_ERROR') {
      return error.originalStatus
    }

    return '0'
  }

  return error.status
}
