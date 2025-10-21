import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setStartGettingLocation} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const useStartGettingLocation = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()

  const makeSetStartGettingLocation = useCallback(
    () => dispatch(setStartGettingLocation(highAccuracyPurposeKey)),
    [dispatch, highAccuracyPurposeKey],
  )

  return {makeSetStartGettingLocation}
}
