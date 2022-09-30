import {EnvironmentConfig} from '@/environment'
import {Address} from '@/modules/address'

export const bulkyWasteAppointmentUrl = (
  opmerking: string,
  address: Address | undefined,
  environment: EnvironmentConfig,
): string | undefined => {
  if (!address || !opmerking.startsWith('Maak een afspraak')) {
    return undefined
  }

  const {postcode, huisnummer, bag_huisletter, bag_toevoeging} = address

  return (
    environment.bulkyWasteFormUrl +
    '?GUID=' +
    [postcode, huisnummer, bag_huisletter, bag_toevoeging].join(',')
  )
}
