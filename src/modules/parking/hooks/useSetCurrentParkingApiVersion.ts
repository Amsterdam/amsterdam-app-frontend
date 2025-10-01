import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setCurrentApiVersion} from '@/modules/parking/slice'
import {ParkingApiVersion} from '@/modules/parking/types'

export const useSetCurrentParkingApiVersion = () => {
  const dispatch = useDispatch()

  return useCallback(
    (version: ParkingApiVersion) => {
      dispatch(setCurrentApiVersion(version))
    },
    [dispatch],
  )
}
