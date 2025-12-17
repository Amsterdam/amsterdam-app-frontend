import {useEffect} from 'react'
import {Platform, BackHandler} from 'react-native'

export const useOnAndroidBackPress = (onHandleBackPress: () => boolean) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      const listener = BackHandler.addEventListener(
        'hardwareBackPress',
        onHandleBackPress,
      )

      return () => {
        listener.remove()
      }
    }
  }, [onHandleBackPress])
}
