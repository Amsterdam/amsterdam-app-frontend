import {useIsFocused} from '@react-navigation/native'
import {useEffect} from 'react'

/**
 * Executes the callback when the screen blurs, i.e. it goes out of focus when you navigate away. This is the opposite of the react-navigation useFocusEffect hook.
 */
export const useBlurEffect = (callback: () => void) => {
  const focused = useIsFocused()

  return useEffect(() => {
    if (!focused) {
      callback()
    }
  }, [callback, focused])
}
