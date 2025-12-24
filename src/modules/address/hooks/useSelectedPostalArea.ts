import {skipToken} from '@reduxjs/toolkit/query'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useGetPostalAreaQuery} from '@/modules/address/service'
import {addressHasCoordinates} from '@/modules/address/utils/addressHasCoordinates'

export const useSelectedPostalArea = () => {
  const {address} = useSelectedAddress()

  const shouldGetPostalArea =
    addressHasCoordinates(address) && !address.postcode

  const {data: {postal_area} = {}} = useGetPostalAreaQuery(
    shouldGetPostalArea ? address.coordinates : skipToken,
  )

  return address?.postcode || (shouldGetPostalArea ? postal_area : undefined)
}
