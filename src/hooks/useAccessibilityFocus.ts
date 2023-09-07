import {MutableRefObject, useCallback, useRef} from 'react'
import {
  AccessibilityInfo,
  findNodeHandle,
  InteractionManager,
  Platform,
} from 'react-native'

/**
 * Returns a ref object which when bound to an element, will focus that element in VO/TB/Keyboard on its appearance.
 * Workaround until fixed in react-navigation library. See issue: https://github.com/react-navigation/react-navigation/issues/7056
 */
export const useAccessibilityFocus = (): [
  MutableRefObject<null>,
  () => void,
] => {
  const ref = useRef(null)

  const setFocus = useCallback(() => {
    if (Platform.OS !== 'ios' || !ref.current) {
      return
    }

    const performSetFocus = () => {
      void InteractionManager.runAfterInteractions(async () => {
        const isScreenReaderEnabled =
          await AccessibilityInfo.isScreenReaderEnabled()

        if (isScreenReaderEnabled) {
          const focusPoint = findNodeHandle(ref.current)

          if (focusPoint) {
            AccessibilityInfo.setAccessibilityFocus(focusPoint)
          }
        }
      })
    }

    performSetFocus()
  }, [ref])

  return [ref, setFocus]
}
