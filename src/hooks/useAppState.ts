import {useEffect} from 'react'
import {AppStateStatus} from 'react-native'
import {AppLifecycle, useAppLifecycle} from 'react-native-applifecycle'

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
}: AppStateHandlers = {}): AppStateStatus => {
  const currentLifecycle = useAppLifecycle()

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (currentLifecycle !== 'active' && nextAppState === 'active') {
        onForeground?.()
      } else if (
        currentLifecycle !== 'inactive' &&
        nextAppState === 'inactive'
      ) {
        onInactive?.()
      } else if (
        currentLifecycle !== 'background' &&
        nextAppState === 'background'
      ) {
        onBackground?.()
      }

      onChange?.(nextAppState)
    }
    const listener = AppLifecycle.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => listener.remove()
  }, [onChange, onForeground, onBackground, onInactive, currentLifecycle])

  return currentLifecycle
}
