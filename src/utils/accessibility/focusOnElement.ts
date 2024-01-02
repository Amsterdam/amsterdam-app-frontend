import {Component, useCallback} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

/** Set accessibility focus to element reference
 *
 * @param elementRef - React component reference
 */
export const useFocusOnElement = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (elementRef: Component | null) => {
      if (!elementRef) {
        return
      }

      const node = findNodeHandle(elementRef)

      if (!node) {
        sendSentryErrorLog('Node not found for ref', 'useFocusOnElement')

        return
      }

      AccessibilityInfo.setAccessibilityFocus(node)
    },
    [sendSentryErrorLog],
  )
}
