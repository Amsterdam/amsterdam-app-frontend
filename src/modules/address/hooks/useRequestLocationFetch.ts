import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationType, requestLocationFetch} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'

export const useRequestLocationFetch = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()
  const locationType = useSelector(selectLocationType)

  const startLocationFetch = useCallback(
    () => dispatch(requestLocationFetch(highAccuracyPurposeKey)),
    [dispatch, highAccuracyPurposeKey],
  )

  useEffect(() => {
    if (locationType === 'location') {
      startLocationFetch()
    }
  }, [locationType, startLocationFetch])

  return {startLocationFetch}
}
