import AsyncStorage from '@react-native-async-storage/async-storage'
import {useCallback} from 'react'
import {useSentry} from '@/hooks/useSentry'

export enum AsyncStorageKey {
  versionNumber = 'VERSION_NUMBER',
}

export const useAsyncStorage = <T>(key: AsyncStorageKey) => {
  const {sendSentryErrorLog} = useSentry()

  const getFromAsyncStorage = useCallback<
    () => Promise<T | undefined>
  >(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)

      return jsonValue !== null ? (JSON.parse(jsonValue) as T) : undefined
    } catch (error) {
      sendSentryErrorLog(
        'Failed to get data from AsyncStorage',
        'useAsyncStorage.ts',
        {key, error},
      )
    }
  }, [key, sendSentryErrorLog])

  const storeInAsyncStorage = useCallback<(value: T) => Promise<void>>(
    async value => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (error) {
        sendSentryErrorLog(
          'Failed to store data in AsyncStorage',
          'useAsyncStorage.ts',
          {key, error},
        )
      }
    },
    [key, sendSentryErrorLog],
  )

  return {getFromAsyncStorage, storeInAsyncStorage}
}
