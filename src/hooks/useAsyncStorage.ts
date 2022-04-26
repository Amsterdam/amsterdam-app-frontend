import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from 'react'
import {Alert} from 'react-native'

export const useAsyncStorage = () => {
  const [error, setError] = useState<unknown | undefined>()
  const [isLoading, setLoading] = useState(true)

  const storeData = async (key: string, obj: any) => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const getValue = async <T>(key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      const obj: T = jsonValue != null ? JSON.parse(jsonValue) : undefined
      return obj
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const removeValue = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
      return 'success'
    } catch (e) {
      setError(e)
      return 'failure'
    } finally {
      setLoading(false)
    }
  }

  const clear = async () => {
    const clearAsyncStorage = () => {
      try {
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
      } catch (e) {
      } finally {
        setLoading(false)
      }
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
      const all = await AsyncStorage.multiGet(keys.slice())
      return all
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    clear,
    error,
    getAllValues,
    getValue,
    removeValue,
    isLoading,
    storeData,
  }
}
