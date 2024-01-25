import {DependencyList, useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useAppState} from '@/hooks/useAppState'

type Options = {
  callback?: (isReduceMotionEnabled: boolean) => void
  callbackAfterAppStateChange?: boolean
}

export let isReduceMotionEnabled = false

export const useIsReduceMotionEnabled = (
  {callback, callbackAfterAppStateChange = true}: Options = {},
  deps: DependencyList | undefined = [],
) => {
  useAppState({
    onForeground: () => {
      void AccessibilityInfo.isReduceMotionEnabled().then(value => {
        isReduceMotionEnabled = value

        if (callbackAfterAppStateChange) {
          callback?.(value)
        }
      })
    },
  })

  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(value => {
      isReduceMotionEnabled = value
      callback?.(value)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return isReduceMotionEnabled
}
