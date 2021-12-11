import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from 'react'
import {Alert} from 'react-native'
import {getEnvironment} from '../environment'

export const useAsyncStorage = () => {
  const [error, setError] = useState<unknown | undefined>()

  const storeData = async (key: string, obj: any) => {
    getEnvironment().debug && console.log('store', key, obj)
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      setError(e)
    }
  }

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      const obj = jsonValue != null ? JSON.parse(jsonValue) : undefined
      getEnvironment().debug && console.log('retrieve', key, obj)
      getEnvironment().debug && obj.projects && console.table(obj.projects)
      return obj
    } catch (e) {
      setError(e)
    }
  }

  const clear = async () => {
    const clearAsyncStorage = () => {
      try {
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
      } catch (e) {}

      getEnvironment().debug && console.info('Alle instellingen gewist.')
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

  const getAll = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const all = await AsyncStorage.multiGet(keys)
      return all
    } catch (e) {
      setError(e)
    }
  }

  return {clear, error, getAll, getData, storeData}
}
