import {useFocusEffect} from '@react-navigation/core'
import {type DependencyList, useCallback} from 'react'
import {useAppState} from '@/hooks/useAppState'

export const useFocusAndForegroundEffect = (
  callback: () => void,
  deps: DependencyList,
): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCallback = useCallback(callback, deps)

  useFocusEffect(onCallback)
  useAppState({
    onForeground: onCallback,
  })
}
