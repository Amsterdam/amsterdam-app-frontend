import {EventListenerCallback} from '@react-navigation/core'
import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'

/**
 * Execute the callback before the user navigates to another screen.
 * You can prevent the navigation by calling the `preventDefault` method of the event.
 * The `beforeRemove` event will *not* be triggered if the user "navigates" to a modal (as opposed to `blur`).
 */
export const useBeforeRemove = (
  callback: EventListenerCallback<
    Record<'beforeRemove', {canPreventDefault: true}>,
    'beforeRemove'
  >,
) => {
  const navigation = useNavigation()

  useEffect(
    () => navigation.addListener('beforeRemove', callback),
    [callback, navigation],
  )
}
