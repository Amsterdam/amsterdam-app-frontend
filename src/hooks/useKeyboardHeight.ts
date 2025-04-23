import {useState, useEffect} from 'react'
import {KeyboardEventListener, Keyboard} from 'react-native'

export const useKeyboardHeight = () => {
  const [height, setHeight] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onKeyboardDidShow: KeyboardEventListener = e => {
      setHeight(e.endCoordinates.height)
      setVisible(true)
    }
    const onKeyboardDidHide: KeyboardEventListener = () => {
      setVisible(false)
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    )
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    )

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return {height, visible}
}
