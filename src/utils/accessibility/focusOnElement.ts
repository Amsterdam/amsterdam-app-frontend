import {Component} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'
import {devError} from '@/processes/development'

/** Set accessibility focus to element reference
 *
 * @param elementRef - React component reference
 */
export const focusOnElement = (elementRef: Component) => {
  const node = findNodeHandle(elementRef)

  if (!node) {
    devError('focusOnElement', 'node is not found')

    return
  }

  AccessibilityInfo.setAccessibilityFocus(node)
}
