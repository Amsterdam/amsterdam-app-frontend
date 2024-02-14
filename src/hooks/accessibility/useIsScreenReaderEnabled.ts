import {useEffect, useState} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'

export const useIsScreenReaderEnabled = () => {
  const [enabled, setEnabled] = useState(false)
  const {sendSentryErrorLog} = useSentry()

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled()
      .then(setEnabled)
      .catch((error: unknown) =>
        sendSentryErrorLog(
          SentryErrorLogKey.isScreenReaderEnabled,
          'useIsScreenReaderEnabled.ts',
          {error},
        ),
      )

    const listener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setEnabled,
    )

    return () => listener.remove()
  }, [sendSentryErrorLog])

  return enabled
}
