import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setLocationType as setCurrentLocationType} from '@/modules/address/slice'
import {LocationType} from '@/modules/address/types'

export const useSetLocationType = () => {
  const dispatch = useDispatch()

  return useCallback(
    (type: LocationType) =>
      dispatch(
        setCurrentLocationType({
          locationType: type,
        }),
      ),
    [dispatch],
  )
}
