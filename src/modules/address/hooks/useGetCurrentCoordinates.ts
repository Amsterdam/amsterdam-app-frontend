import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  GetCurrentPositionError,
  useGetCurrentPosition,
} from '@/modules/address/hooks/useGetCurrentPosition'
import {addCurrentCoordinates} from '@/modules/address/slice'
import {devLog} from '@/processes/development'

/**
 * Returns a function which requests the user's current coordinates and stores them in the Address module's Redux state.
 */
export const useGetCurrentCoordinates = () => {
  const getCurrentPosition = useGetCurrentPosition()
  const dispatch = useDispatch()

  return useCallback(
    () =>
      getCurrentPosition()
        .then(({coords: {latitude, longitude}}) => {
          dispatch(addCurrentCoordinates({lat: latitude, lon: longitude}))
        })
        .catch((error: GetCurrentPositionError) => {
          // TODO: handle get position and request location error
          devLog(error)
        }),
    [dispatch, getCurrentPosition],
  )
}
