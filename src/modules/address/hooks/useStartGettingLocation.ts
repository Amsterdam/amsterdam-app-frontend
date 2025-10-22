import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectLocationType,
  setStartGettingLocation,
} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const useStartGettingLocation = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()
  const locationType = useSelector(selectLocationType)

  const makeSetStartGettingLocation = useCallback(
    () => dispatch(setStartGettingLocation(highAccuracyPurposeKey)),
    [dispatch, highAccuracyPurposeKey],
  )

  useEffect(() => {
    if (locationType === 'location') {
      makeSetStartGettingLocation()
    }
  }, [locationType, makeSetStartGettingLocation])

  return {makeSetStartGettingLocation}
}
