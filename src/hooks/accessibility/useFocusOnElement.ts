import {Component, useCallback} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'

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
        sendSentryErrorLog(SentryErrorLogKey.nodeNotFound, 'useFocusOnElement')

        return
      }

      AccessibilityInfo.setAccessibilityFocus(node)
    },
    [sendSentryErrorLog],
  )
}
