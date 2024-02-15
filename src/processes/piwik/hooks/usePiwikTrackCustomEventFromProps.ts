import {useCallback} from 'react'
import {type TestProps} from '@/components/ui/types'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {
  CustomDimensions,
  PiwikAction,
  type LogProps,
} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'
import {type RequirePick} from '@/types/utils'

type Props<T> = {
  onEvent?: ((event: T) => void) | (() => void)
  'sentry-label'?: string
} & TestProps &
  RequirePick<LogProps, 'logAction'>

type ExtraProps = {
  action?: PiwikAction
  dimensions?: CustomDimensions
  nameSuffix?: string
}

export const usePiwikTrackCustomEventFromProps = <T = unknown>({
  logAction,
  logCategory,
  logDimensions = {},
  logValue,
  onEvent,
  testID,
  logName,
  'sentry-label': sentryLabel,
}: Props<T>) => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(
    (
      event: T,
      {nameSuffix, dimensions = {}, action = logAction}: ExtraProps = {},
    ) => {
      onEvent?.(event)
      const name = getLogNameFromProps({
        testID,
        logName,
        'sentry-label': sentryLabel,
      })

      if (name) {
        const suffix = nameSuffix ? `:${nameSuffix}` : ''

        trackCustomEvent(
          `${name}${suffix}`,
          action,
          {...logDimensions, ...dimensions},
          logCategory,
          logValue,
        )
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
