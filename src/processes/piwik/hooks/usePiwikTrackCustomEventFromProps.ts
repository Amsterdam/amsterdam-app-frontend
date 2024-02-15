import {useCallback} from 'react'
import {type TestProps} from '@/components/ui/types'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {type LogProps} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'
import {type RequirePick} from '@/types/utils'

type Props<T> = {
  onEvent?: ((event: T) => void) | (() => void)
  'sentry-label'?: string
} & TestProps &
  RequirePick<LogProps, 'logAction'>

export const usePiwikTrackCustomEventFromProps = <T>({
  logAction,
  logCategory,
  logDimensions,
  logValue,
  onEvent,
  testID,
  logName,
  'sentry-label': sentryLabel,
}: Props<T>) => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(
    (event: T) => {
      onEvent?.(event)
      const name = getLogNameFromProps({
        testID,
        logName,
        'sentry-label': sentryLabel,
      })

      if (name) {
        trackCustomEvent(name, logAction, logDimensions, logCategory, logValue)
      }
    },
    [
      logAction,
      logCategory,
      logDimensions,
      logName,
      logValue,
      onEvent,
      sentryLabel,
      testID,
      trackCustomEvent,
    ],
  )
}
