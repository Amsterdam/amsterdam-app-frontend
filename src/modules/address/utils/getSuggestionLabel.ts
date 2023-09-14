import {PdokAddress} from '@/modules/address/types'
import {getAddressLine1} from '@/modules/address/utils/transformAddressApiResponse'

export const getSuggestionLabelForStreetOrAddress = (
  pdokAddress: PdokAddress,
): string => {
  const {straatnaam, type, woonplaatsnaam} = pdokAddress

  if (type === 'weg') {
    if (woonplaatsnaam === 'Amsterdam') {
      return straatnaam
    } else {
      return `${straatnaam}, ${woonplaatsnaam}`
    }
  }

  const streetAndHouseNumber = getAddressLine1(pdokAddress)

  if (woonplaatsnaam === 'Amsterdam') {
    return streetAndHouseNumber
  } else {
    return `${streetAndHouseNumber}, ${woonplaatsnaam}`
  }
}

export const getSuggestionLabelForNumber = ({
  huisnummer,
  huisnummertoevoeging,
  huisletter,
}: PdokAddress) =>
  `${huisnummer}${huisletter ?? ''}${
    huisnummertoevoeging ? `-${huisnummertoevoeging}` : ''
  }`

export const getSuggestionLabel = (
  pdokAddress: PdokAddress,
  numbersOnly: boolean,
) =>
  numbersOnly
    ? getSuggestionLabelForNumber(pdokAddress)
    : getSuggestionLabelForStreetOrAddress(pdokAddress)
