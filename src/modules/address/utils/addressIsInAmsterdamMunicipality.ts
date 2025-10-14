import {Address, AddressCity, BaseAddress} from '@/modules/address/types'

const citiesInAmsterdamMunicipality = [AddressCity.Amsterdam, AddressCity.Weesp]

export const addressIsInAmsterdamMunicipality = ({
  city,
}: Address | BaseAddress) => citiesInAmsterdamMunicipality.includes(city)
