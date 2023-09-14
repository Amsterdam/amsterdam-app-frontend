import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'

/**
 * Executes the callback when the screen blurs, i.e. it goes out of focus when you navigate away. This is the opposite of the react-navigation useFocusEffect hook.
 */
export const useBlurEffect = (callback: () => void) => {
  const navigation = useNavigation()

  useEffect(
    () => navigation.addListener('blur', callback),
    [callback, navigation],
  )
}
