import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCoordinatesForLocation} from '@/modules/address/hooks/useGetCoordinatesForLocation'
import {useSaveAddress} from '@/modules/address/hooks/useSaveAddress'
import {useGetLocationQuery} from '@/modules/address/service'
import {
  setGetLocationIsError,
  setIsGettingLocation,
} from '@/modules/address/slice'

/**
 * Gets the GPS coordinates from the device, fetches the corresponding address which is then stored in redux.
 */
export const useGetLocation = () => {
  const dispatch = useDispatch()

  const {coordinatesForLocation, isGettingCoordinates} =
    useGetCoordinatesForLocation()

  const {currentData, isError, isFetching} = useGetLocationQuery(
    coordinatesForLocation ?? skipToken,
  )

  useSaveAddress(currentData)

  useEffect(() => {
    dispatch(setIsGettingLocation(isGettingCoordinates || isFetching))
  }, [dispatch, isFetching, isGettingCoordinates])

  useEffect(() => {
    if (isError) {
      dispatch(setGetLocationIsError(true))
    }
  }, [dispatch, isError])
}
