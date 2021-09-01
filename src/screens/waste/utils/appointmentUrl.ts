import {getEnvironment} from '../../../environment'
import {Address} from '../../../types/address'

export const appointmentUrl = (
  address: Address | undefined,
  opmerking: string,
): string | undefined => {
  if (!address || !opmerking.startsWith('Maak een afspraak')) {
    return undefined
  }

  const {postcode, huisnummer, bag_huisletter, bag_toevoeging} = address

  return (
    getEnvironment().bulkyWasteFormUrl +
    '?GUID=' +
    [postcode, huisnummer, bag_huisletter, bag_toevoeging].join(',')
  )
}
