import {useMemo} from 'react'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useLocation} from '@/modules/address/hooks/useLocation'
import {selectLocationType} from '@/modules/waste-guide/slice'
import {useAppSelector} from '@/store/hooks'

export const useLocationInfo = () => {
  const address = useAddress()
  const location = useLocation()
  const locationType = useAppSelector(selectLocationType)

  return useMemo(() => {
    const validAddress = locationType === 'address' ? address : undefined
    const validLocation = locationType === 'location' ? location : undefined

    return {
      address: validAddress,
      location: validLocation,
      selectedAddress: validAddress ?? validLocation,
    }
  }, [address, location, locationType])
}
