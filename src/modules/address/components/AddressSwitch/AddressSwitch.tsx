import {useMemo} from 'react'
import type {TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressSwitchBase} from '@/modules/address/components/AddressSwitch/AddressSwitchBase'
import {AddressRouteName} from '@/modules/address/routes'
import {useLocationType, useAddress, useLocation} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export type AddressSwitcherProps = TestProps

export const AddressSwitch = ({testID}: AddressSwitcherProps) => {
  const locationType = useLocationType()
  const address = useAddress()
  const {isGettingLocation, location} = useLocation()
  const {navigate} = useNavigation()

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
      onPress={() =>
        navigate(ModuleSlug.address, {screen: AddressRouteName.address})
      }
      testID={testID}
      title={title}
    />
  )
}
