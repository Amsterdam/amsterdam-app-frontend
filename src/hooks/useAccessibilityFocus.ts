import {MutableRefObject, useCallback, useRef} from 'react'
import {
  AccessibilityInfo,
  findNodeHandle,
  InteractionManager,
  Platform,
} from 'react-native'

/**
 * Returns a ref object which when bound to an element, will focus that
 * element in VoiceOver/TalkBack on its appearance
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
