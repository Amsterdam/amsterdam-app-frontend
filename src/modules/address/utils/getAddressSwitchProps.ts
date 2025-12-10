import type {Address, LocationType} from '@/modules/address/types'

export const getAddressSwitchIcon = (
  locationType?: LocationType,
  address?: Address,
  isFetching?: boolean,
) => {
  if (locationType === 'address' && address?.addressLine1) {
    return 'housing'
  }

  if (isFetching) {
    return 'spinner'
  }

  if (locationType === 'location' && address?.addressLine1) {
    return 'mapLocationIosFilled'
  }

  return 'location'
}

export const getAddressSwitchLabel = (
  locationType?: LocationType,
  address?: Address,
  isFetching?: boolean,
) => {
  if (locationType === 'address' && address?.addressLine1) {
    return address?.addressLine1
  }

  if (isFetching) {
    return 'Mijn huidige locatie'
  }

  if (locationType === 'location' && address?.addressLine1) {
    return address?.addressLine1
  }

  return 'Adres invullen'
}
