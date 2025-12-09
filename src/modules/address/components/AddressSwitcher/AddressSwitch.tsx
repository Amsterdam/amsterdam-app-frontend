import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import {AddressSwitchBase} from '@/modules/address/components/AddressSwitcher/AddressSwitchBase'
import {useLocationType, useAddress, useLocation} from '@/modules/address/slice'

export type AddressSwitcherProps = TestProps

export const AddressSwitch = ({testID, ...props}: AddressSwitcherProps) => {
  const locationType = useLocationType()
  const address = useAddress()
  const {isGettingLocation, location} = useLocation()

  const iconName = useMemo(() => {
    if (locationType === 'address' && address?.addressLine1) {
      return 'housing'
    }

    if (isGettingLocation) {
      return 'spinner'
    }

    if (locationType === 'location' && location?.addressLine1) {
      return 'mapLocationIosFilled'
    }

    return 'location'
  }, [address, location, isGettingLocation, locationType])

  const title = useMemo(() => {
    if (locationType === 'address' && address?.addressLine1) {
      return address?.addressLine1
    }

    if (isGettingLocation) {
      return 'Mijn huidige locatie'
    }

    if (locationType === 'location' && location?.addressLine1) {
      return location?.addressLine1
    }

    return 'Adres invullen'
  }, [address, location, isGettingLocation, locationType])

  return (
    <AddressSwitchBase
      iconName={iconName}
      testID={testID}
      title={title}
      {...props}
    />
  )
}
