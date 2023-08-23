import {useCallback} from 'react'
import {
  GetCurrentPositionError,
  useGetCurrentPosition,
} from '@/modules/address/hooks/useGetCurrentPosition'
import {Coordinates} from '@/modules/address/types'

/**
 * Returns a function which requests the user's current coordinates and stores them in the Address module's Redux state.
 */
export const useGetCurrentCoordinates = () => {
  const getCurrentPosition = useGetCurrentPosition()

  return useCallback(
    () =>
      new Promise<Coordinates>((resolve, reject) => {
        getCurrentPosition()
          .then(({coords: {latitude, longitude}}) => {
            resolve({lat: latitude, lon: longitude})
          })
          .catch((error: GetCurrentPositionError) => {
            // TODO: handle get position and request location error
            reject(error)
          })
      }),
    [getCurrentPosition],
  )
}
