import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCoordinatesForLocationQuery} from '@/modules/address/hooks/useGetCoordinatesForLocationQuery'
import {useSaveAddress} from '@/modules/address/hooks/useSaveAddress'
import {useGetLocationQuery} from '@/modules/address/service'
import {
  setGetLocationIsError,
  setIsGettingLocation,
  useLocation,
} from '@/modules/address/slice'

const NUM_OF_SUGGESTIONS = 5

/**
 * Gets the GPS coordinates from the device, fetches the corresponding address which is then stored in redux.
 */
export const useGetLocation = (rows: number = NUM_OF_SUGGESTIONS) => {
  const dispatch = useDispatch()
  const {isGettingLocation, getLocationIsError} = useLocation()
  const {
    coordinatesForLocationQuery,
    getCoordinatesForLocationQuery,
    isGettingCoordinates,
  } = useGetCoordinatesForLocationQuery()
  const {currentData, isError, isFetching} = useGetLocationQuery(
    coordinatesForLocationQuery
      ? {...coordinatesForLocationQuery, rows}
      : skipToken,
  )

  useSaveAddress(currentData?.response?.docs)

  useEffect(() => {
    dispatch(setIsGettingLocation(isGettingCoordinates || isFetching))
  }, [dispatch, isFetching, isGettingCoordinates])

  useEffect(() => {
    if (isError) {
      dispatch(setGetLocationIsError(true))
    }
  }, [dispatch, isError])

  return {
    getLocationIsError,
    getCoordinatesForLocationQuery,
    isGettingLocation,
    pdokAddresses: currentData?.response?.docs,
  }
}
