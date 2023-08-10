import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'

/**
 * Do something, e.g. a clean up action, when the user navigates to another screen.
 */
export const useBeforeRemove = (callback: () => unknown) => {
  const navigation = useNavigation()

  useEffect(
    () => navigation.addListener('beforeRemove', callback),
    [callback, navigation],
  )
}
