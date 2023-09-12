import {useIsFocused} from '@react-navigation/core'
import {Platform} from 'react-native'

export const useIsFocusedOnAndroid = () => {
  const focused = useIsFocused()

  return focused || Platform.OS !== 'android'
}
