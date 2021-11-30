import {RouteProp, useRoute} from '@react-navigation/core'
import {useCallback, useEffect} from 'react'
import {RootStackParamList} from '../../../App'
import {useAsyncStorage} from '../../hooks'

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>

export const StoreManagerToken = () => {
  const route: HomeScreenRouteProp = useRoute()
  const asyncStorage = useAsyncStorage()

  const getManagerIdFromStorage = useCallback(async () => {
    const manager = await asyncStorage.getData('manager')
    return manager?.id
  }, [asyncStorage])

  useEffect(() => {
    const asyncFn = async () => {
      const managerId = await getManagerIdFromStorage()
      if (route.params?.id && !managerId) {
        asyncStorage.storeData('manager', {id: route.params.id})
      }
    }
    asyncFn()
  }, [asyncStorage, getManagerIdFromStorage, route.params?.id])
}
