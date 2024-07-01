import {useCallback} from 'react'
import {AllowListKeys} from '@/processes/logging/allowList'
import {ExceptionLogKey} from '@/processes/logging/types'
import {getAllowedData} from '@/processes/logging/utils/getAllowedData'
import {useAppInsights} from '@/providers/appinsights.provider'

export {ExceptionLogKey} from '@/processes/logging/types'

export const enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

type TrackException = <T extends ExceptionLogKey>(
  logKey: T,
  filename: string,
  data?: AllowListKeys<T> extends never
    ? never
    : Partial<Record<AllowListKeys<T>, unknown>>,
  /**
   * @default `SeverityLevel.Error`
   */
  severityLevel?: SeverityLevel,
) => void

export const useTrackException = () => {
  const appInsights = useAppInsights()

  return useCallback<TrackException>(
    (logKey, filename, data, severityLevel = SeverityLevel.Error) => {
      appInsights.trackException(
        {
          exception: new Error(logKey),
          severityLevel,
          properties: {...getAllowedData(logKey, data), filename},
        },
        {},
      )
    },
    [appInsights],
  )
}
