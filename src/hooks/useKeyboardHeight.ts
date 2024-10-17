import {useState, useEffect} from 'react'
import {KeyboardEventListener, Keyboard} from 'react-native'

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const onKeyboardDidShow: KeyboardEventListener = e => {
      setKeyboardHeight(e.endCoordinates.height)
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    )

    return () => {
      showSubscription.remove()
    }
  }, [])

  return keyboardHeight
}
