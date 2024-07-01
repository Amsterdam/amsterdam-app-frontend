import {allowList} from '@/processes/logging/allowList'
import {type ExceptionLogKey} from '@/processes/logging/types'

/**
 * Get only allowed data for logging
 */
export const getAllowedData = (
  logKey: ExceptionLogKey,
  data?: Record<string, unknown>,
) => {
  if (!data || Object.keys(data).length === 0) {
    return undefined
  }

  return (allowList[logKey] as readonly string[])?.reduce(
    (obj, key) => ({...obj, [key]: data[key]}),
    {},
  )
}
