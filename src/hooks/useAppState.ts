import {useEffect, useRef} from 'react'
import {AppStateStatus} from 'react-native'
import {AppLifecycle} from 'react-native-applifecycle'

type AppStateHandlers = {
  onBackground?: () => void
  onChange?: (nextAppState: AppStateStatus) => void
  onForeground?: () => void
  onInactive?: () => void
}

export const useAppState = ({
  onChange,
  onForeground,
  onBackground,
  onInactive,
}: AppStateHandlers = {}) => {
  const cur = useRef('unknown' as AppStateStatus)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (cur.current !== 'active' && nextAppState === 'active') {
        onForeground?.()
      } else if (cur.current !== 'inactive' && nextAppState === 'inactive') {
        onInactive?.()
      } else if (
        cur.current !== 'background' &&
        nextAppState === 'background'
      ) {
        onBackground?.()
      }

      onChange?.(nextAppState)
      cur.current = nextAppState
    }
    const listener = AppLifecycle.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => listener.remove()
  }, [onChange, onForeground, onBackground, onInactive])
}
