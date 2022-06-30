import {useState, useEffect} from 'react'
import {AppState, AppStateStatus} from 'react-native'

type AppStateHandlers = {
  onChange?: (nextAppState: AppStateStatus) => void
  onForeground?: () => void
  onBackground?: () => void
  onInactive?: () => void
}

export const useAppState = ({
  onChange,
  onForeground,
  onBackground,
  onInactive,
}: AppStateHandlers = {}): AppStateStatus => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  )

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (appState !== 'active' && nextAppState === 'active') {
        onForeground?.()
      } else if (appState !== 'inactive' && nextAppState === 'inactive') {
        onInactive?.()
      } else if (appState !== 'background' && nextAppState === 'background') {
        onBackground?.()
      }
      onChange?.(nextAppState)
      setAppState(nextAppState)
    }
    const listener = AppState.addEventListener('change', handleAppStateChange)

    return () => listener.remove()
  }, [onChange, onForeground, onBackground, onInactive, appState])

  return appState
}
