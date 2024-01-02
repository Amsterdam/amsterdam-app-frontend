import {Component, useCallback} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'
import {useSentry} from '@/hooks/sentry/useSentry'

/**
 * Returns a function to set accessibility focus to element reference
 */
export const useFocusOnElement = () => {
  const {sendSentryErrorLog} = useSentry()

  return useCallback(
    (component: Component | null) => {
      if (!component) {
        return
      }

      const node = findNodeHandle(component)

      if (!node) {
        sendSentryErrorLog('Node not found for ref', 'useFocusOnElement')

        return
      }

      AccessibilityInfo.setAccessibilityFocus(node)
    },
    [sendSentryErrorLog],
  )
}
