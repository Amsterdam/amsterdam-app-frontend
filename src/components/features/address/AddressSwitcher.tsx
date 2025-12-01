import {useMemo} from 'react'
import {
  AddressSwitcherBase,
  type AddressSwitcherProps,
} from '@/components/features/address/AddressSwitcher.Base'
import {useAddress, useLocation, useLocationType} from '@/modules/address/slice'

export const AddressSwitcher = (
  props: Omit<AddressSwitcherProps, 'title' | 'iconName'>,
) => {
  const locationType = useLocationType()
  const address = useAddress()
  const {isGettingLocation, location} = useLocation()

  const iconName: AddressSwitcherProps['iconName'] = useMemo(() => {
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
    <AddressSwitcherBase
      iconName={iconName}
      title={title}
      {...props}
    />
  )
}
