import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {addLocation} from '@/modules/address/slice'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'

/** Number of suggestions returned by the address-for-coordinates Api */
const SUGGESTION_COUNT = 5

export const useGetAddressByCoordinates = (
  purposeKey: HighAccuracyPurposeKey = HighAccuracyPurposeKey.PreciseLocationAddressLookup,
) => {
  const dispatch = useDispatch()
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>()
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)
  const getCurrentCoordinates = useGetCurrentCoordinates(purposeKey)

  const {pdokAddresses, firstAddress, isFetching} = useAddressForCoordinates({
    coordinates,
    rows: SUGGESTION_COUNT,
  })

  const getCoordinates = useCallback(async () => {
    try {
      setIsGettingCoordinates(true)
      const currentCoordinates = await getCurrentCoordinates()

      setCoordinates(currentCoordinates)
    } finally {
      setIsGettingCoordinates(false)
    }
  }, [getCurrentCoordinates])

  useEffect(() => {
    if (firstAddress) {
      dispatch(addLocation(firstAddress))
    }
  }, [dispatch, firstAddress])

  return {
    getCoordinates,
    isGettingAddressForCoordinates: isFetching || isGettingCoordinates,
    pdokAddresses,
    firstAddress,
  }
}
