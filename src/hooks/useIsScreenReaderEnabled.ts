import {useEffect, useState} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

export const useIsScreenReaderEnabled = () => {
  const [enabled, setEnabled] = useState(false)
  const {sendSentryErrorLog} = useSentry()

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled()
      .then(setEnabled)
      .catch((error: unknown) => {
        sendSentryErrorLog(
          'isScreenReaderEnabled check failed',
          'useIsScreenReaderEnabled.ts',
          {error},
        )
      })

    const listener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setEnabled,
    )

    return () => listener.remove()
  }, [sendSentryErrorLog])

  return enabled
}
