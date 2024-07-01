import {useCallback} from 'react'
import {SeverityLevel, TrackException} from '@/processes/logging/types'
import {getAllowedData} from '@/processes/logging/utils/getAllowedData'
import {useAppInsights} from '@/providers/appinsights.provider'

export {ExceptionLogKey, SeverityLevel} from '@/processes/logging/types'

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
