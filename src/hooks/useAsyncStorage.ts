import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from 'react'
import {Alert} from 'react-native'

export const useAsyncStorage = () => {
  const [error, setError] = useState<unknown | undefined>()

  const storeData = async (key: string, obj: any) => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      setError(e)
    }
  }

  const getValue = async <T>(key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      const obj: T = jsonValue != null ? JSON.parse(jsonValue) : undefined
      return obj
    } catch (e) {
      setError(e)
    }
  }

  const removeValue = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      setError(e)
    }
  }

  const clear = async () => {
    const clearAsyncStorage = () => {
      try {
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
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
    removeValue,
    storeData,
  }
}
