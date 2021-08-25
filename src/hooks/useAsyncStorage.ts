import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from 'react'

export const useAsyncStorage = () => {
  const [error, setError] = useState()
  const storeData = async (key: string, obj: any) => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue) // To see storage, enter showAsyncStorageContentInDev() in RND console
    } catch (e) {
      setError(e)
    }
  }

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      setError(e)
    }
  }

  return {error, storeData, getData}
}
