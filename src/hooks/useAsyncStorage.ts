import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from 'react'
import {Alert} from 'react-native'

export const useAsyncStorage = () => {
  const [error, setError] = useState<unknown | undefined>()
  const [isStoreUpdated, setStoreUpdated] = useState(false)

  const storeData = async (key: string, obj: any) => {
    try {
      setStoreUpdated(false)
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
      setStoreUpdated(true)
    } catch (e) {
      setError(e)
    }
  }

  const getValue = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      const obj = jsonValue != null ? JSON.parse(jsonValue) : undefined
      return obj
    } catch (e) {
      setError(e)
    }
  }

  const removeValue = async (key: string) => {
    try {
      setStoreUpdated(false)
      await AsyncStorage.removeItem(key)
      setStoreUpdated(true)
    } catch (e) {
      setError(e)
    }
  }

  const clear = async () => {
    const clearAsyncStorage = () => {
      try {
        setStoreUpdated(false)
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
        setStoreUpdated(true)
      } catch (e) {}
    }

    Alert.alert(
      'Weet je het zeker?',
      'Alle instellingen op dit apparaat worden gewist.',
      [
        {
          style: 'cancel',
          text: 'Annuleren',
        },
        {
          onPress: () => clearAsyncStorage(),
          style: 'destructive',
          text: 'Wissen',
        },
      ],
    )
  }

  const getAllValues = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const all = await AsyncStorage.multiGet(keys)
      return all
    } catch (e) {
      setError(e)
    }
  }

  return {
    clear,
    error,
    getAllValues,
    getValue,
    isStoreUpdated,
    removeValue,
    storeData,
  }
}
