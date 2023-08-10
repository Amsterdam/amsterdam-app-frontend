import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {useLocation} from '@/modules/address/hooks/useLocation'
import {selectLocationType} from '@/modules/waste-guide/slice'

export const useLocationInfo = () => {
  const address = useAddress()
  const location = useLocation()
  const locationType = useSelector(selectLocationType)

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
