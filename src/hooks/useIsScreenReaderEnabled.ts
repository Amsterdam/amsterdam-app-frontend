import {AccessibilityInfo} from 'react-native'

export let isScreenReaderEnabled: boolean | undefined

export const useIsScreenReaderEnabled = () => {
  void AccessibilityInfo.isScreenReaderEnabled().then(value => {
    isScreenReaderEnabled = value
  })

  return isScreenReaderEnabled
}
