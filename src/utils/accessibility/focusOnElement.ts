import {Component} from 'react'
import {findNodeHandle, AccessibilityInfo} from 'react-native'

/** Set accessibility focus to element reference
 *
 * @param elementRef - React component reference
 */
export const focusOnElement = (elementRef: Component) => {
  const node = findNodeHandle(elementRef)

  if (!node) {
    return
  }

  AccessibilityInfo.setAccessibilityFocus(node)
}
