import {AddressCity, PdokAddress} from '@/modules/address/types'

const citiesInAmsterdamMunicipality = [AddressCity.Amsterdam, AddressCity.Weesp]

export const addressIsInAmsterdamMunicipality = ({
  woonplaatsnaam,
}: PdokAddress) => citiesInAmsterdamMunicipality.includes(woonplaatsnaam)
