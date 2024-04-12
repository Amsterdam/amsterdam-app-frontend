import {useCallback, useEffect} from 'react'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setStartGettingLocation} from '@/modules/address/slice'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {Permissions} from '@/types/permissions'

export const useStartGettingLocation = (
  highAccuracyPurposeKey?: HighAccuracyPurposeKey,
) => {
  const dispatch = useDispatch()
  const {hasPermission} = usePermission(Permissions.location)

  const makeSetStartGettingLocation = useCallback(
    () => dispatch(setStartGettingLocation(highAccuracyPurposeKey)),
    [dispatch, highAccuracyPurposeKey],
  )

  useEffect(() => {
    dispatch(makeSetStartGettingLocation())
  }, [dispatch, hasPermission, makeSetStartGettingLocation])

  return {makeSetStartGettingLocation}
}
