import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useLocationType} from '@/modules/address/hooks/useLocationType'
import {setLocationType as setCurrentLocationType} from '@/modules/address/slice'
import {LocationType} from '@/modules/address/types'

export const useGetLocationType = () => {
  const dispatch = useDispatch()
  const locationType = useLocationType()

  const setLocationType = useCallback(
    (type: LocationType) =>
      dispatch(
        setCurrentLocationType({
          locationType: type,
        }),
      ),
    [dispatch],
  )

  return {
    setLocationType,
    locationType,
  }
}
