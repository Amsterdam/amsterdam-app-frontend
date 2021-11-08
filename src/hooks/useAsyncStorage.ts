import AsyncStorage from '@react-native-async-storage/async-storage'
import {useContext, useState} from 'react'
import {Alert} from 'react-native'
import {AddressContext} from '../providers'

export const useAsyncStorage = () => {
  const addressContext = useContext(AddressContext)

  const [error, setError] = useState<unknown | undefined>()

  const storeData = async (key: string, obj: any) => {
    console.log('store', key, obj)
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
      const obj = jsonValue != null ? JSON.parse(jsonValue) : null
      console.log('get', key, obj)
      return obj
    } catch (e) {
      setError(e)
    }
  }

  const clear = async () => {
    const clearAsyncStorage = () => {
      try {
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
        // Hmm, waarom moet dit nog apart?
        addressContext.changeAddress(undefined)
      } catch (e) {}

      console.log('Alle instellingen gewist.')
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

  return {clear, error, getData, storeData}
}
