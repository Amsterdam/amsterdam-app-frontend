import {useFocusEffect} from '@react-navigation/native'
import {useState, useCallback} from 'react'

/**
 * Executes the callback when the screen is focused.
 * This is the opposite of the react-navigation useBlurEffect hook.
 * The `focus` event will be triggered when a modal is closed (as opposed to `beforeRemove`).
 */
export const useIsFocusedEffect = () => {
  const [isFocused, setIsFocused] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true)

      return () => {
        setIsFocused(false)
      }
    }, []),
  )

  return isFocused
}
