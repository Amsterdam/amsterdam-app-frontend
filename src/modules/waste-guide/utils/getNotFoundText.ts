import {Address, LocationType} from '@/modules/address/types'

export const getNotFoundText = (
  address?: Address,
  locationType?: LocationType,
) => {
  const locationTypeText =
    locationType === 'address' ? 'dit adres' : 'deze locatie'
  const cityText = address?.city ? ` in ${address.city}` : ''

  return `We hebben geen afvalinformatie gevonden voor ${locationTypeText}${cityText}.`
}
