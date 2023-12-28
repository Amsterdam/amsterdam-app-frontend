import {useEffect, useState} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'
import {SentryLogKey} from '@/types/sentry'

export const useIsScreenReaderEnabled = () => {
  const [enabled, setEnabled] = useState(false)
  const {sendSentryErrorLog} = useSentry()

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled()
      .then(setEnabled)
      .catch((error: unknown) =>
        sendSentryErrorLog(
          SentryLogKey.isScreenReaderEnabled,
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
