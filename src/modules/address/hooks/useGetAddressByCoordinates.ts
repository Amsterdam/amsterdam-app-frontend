import {useCallback, useState} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentCoordinates'
import {AddressModalName} from '@/modules/address/routes'
import {Coordinates, HighAccuracyPurposeKey} from '@/modules/address/types'
import {getPropertyFromMaybeObject} from '@/utils/object'

/** Number of suggestions returned by the address-for-coordinates Api */
const SUGGESTION_COUNT = 5

export const useGetAddressByCoordinates = (
  purposeKey: HighAccuracyPurposeKey = HighAccuracyPurposeKey.PreciseLocationAddressLookup,
) => {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>()
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)
  const getCurrentCoordinates = useGetCurrentCoordinates(purposeKey)

  const {pdokAddresses, ...rest} = useAddressForCoordinates({
    coordinates,
    rows: SUGGESTION_COUNT,
    shouldFetch: !!coordinates,
  })
  const navigation = useNavigation<AddressModalName>()

  const getCoordinates = useCallback(async () => {
    try {
      setIsGettingCoordinates(true)
      const currentCoordinates = await getCurrentCoordinates()

      setCoordinates(currentCoordinates)
    } catch (error) {
      const isTechnicalError = getPropertyFromMaybeObject(
        error,
        'isTechnicalError',
      )

      if (!isTechnicalError) {
        navigation.navigate(AddressModalName.locationPermissionInstructions)
      }
    } finally {
      setIsGettingCoordinates(false)
    }
  }, [getCurrentCoordinates, navigation])

  return {
    getCoordinates,
    isGettingAddressForCoordinates: rest.isFetching || isGettingCoordinates,
    pdokAddresses,
    ...rest,
  }
}
