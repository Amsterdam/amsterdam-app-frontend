import {useState, useRef, useEffect} from 'react'
import {type EmitterSubscription, type NativeEventEmitter} from 'react-native'

export const useListenerStatus = <T>(
  eventType: string,
  eventEmitter: NativeEventEmitter,
) => {
  const [listenerStatus, setListenerStatus] = useState<T | null>(null)
  const onListenerStatusChangedSubscription =
    useRef<EmitterSubscription | null>(null)

  useEffect(() => {
    onListenerStatusChangedSubscription.current?.remove()

    onListenerStatusChangedSubscription.current = eventEmitter.addListener(
      eventType,
      (state: T) => {
        setListenerStatus(state)
      },
    )

    return () => {
      onListenerStatusChangedSubscription.current?.remove()
      onListenerStatusChangedSubscription.current = null
    }
  }, [eventEmitter, eventType])

  return listenerStatus
}
