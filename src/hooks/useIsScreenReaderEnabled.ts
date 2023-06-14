import {DependencyList, useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {useAppState} from '@/hooks/useAppState'

type Options = {
  callback?: (isScreenReaderEnabled: boolean) => void
  callbackAfterAppStateChange?: boolean
}

export let isScreenReaderEnabled: boolean | undefined

export const useIsScreenReaderEnabled = (
  {callback, callbackAfterAppStateChange = true}: Options = {},
  deps: DependencyList | undefined = [],
) => {
  useAppState({
    onForeground: () => {
      void AccessibilityInfo.isScreenReaderEnabled().then(value => {
        isScreenReaderEnabled = value
        if (callbackAfterAppStateChange) {
          callback?.(value)
        }
      })
    },
  })

  useEffect(() => {
    void AccessibilityInfo.isScreenReaderEnabled().then(value => {
      isScreenReaderEnabled = value
      callback?.(value)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return isScreenReaderEnabled
}
