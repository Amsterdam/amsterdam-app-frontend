import {useCallback, useState} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAddressForCoordinates} from '@/modules/address/hooks/useAddressForCoordinates'
import {useGetCurrentCoordinates} from '@/modules/address/hooks/useGetCurrentPosition'
import {GetCurrentPositionError} from '@/modules/address/hooks/useGetCurrentPosition'
import {AddressModalName} from '@/modules/address/routes'
import {Coordinates} from '@/modules/address/types'

/** Number of suggestions returned by the address-for-coordinates Api */
const SUGGESTION_COUNT = 5

export const useGetAddressByCoordinates = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>()
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)
  const getCurrentCoordinates = useGetCurrentCoordinates()
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
      const {status} = error as GetCurrentPositionError

      if (status) {
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
