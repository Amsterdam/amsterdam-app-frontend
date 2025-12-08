import {useMemo} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {useLocationType, useAddress, useLocation} from '@/modules/address/slice'

type AddressSwitchReturn = {
  iconName: Extract<
    SvgIconName,
    'housing' | 'location' | 'spinner' | 'mapLocationIosFilled'
  >
  title: string
}

export const useAddressSwitch = (): AddressSwitchReturn => {
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

  return {iconName, title}
}
