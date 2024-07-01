import {useEffect, useState} from 'react'
import {AccessibilityInfo} from 'react-native'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export const useIsScreenReaderEnabled = () => {
  const [enabled, setEnabled] = useState(false)
  const trackException = useTrackException()

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled()
      .then(setEnabled)
      .catch((error: unknown) =>
        trackException(
          ExceptionLogKey.isScreenReaderEnabled,
          'useIsScreenReaderEnabled.ts',
          {error},
        ),
      )

    const listener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setEnabled,
    )

    return () => listener.remove()
  }, [trackException])

  return enabled
}
