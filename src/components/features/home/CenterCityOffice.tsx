import React from 'react'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {CityOffices} from '../../../types/city'
import {PleaseWait} from '../../ui'
import {CityOffice} from '../contact'

export const CenterCityOffice = () => {
  const {data: cityOffices, isLoading: isCityOfficesLoading} =
    useFetch<CityOffices>({
      url: getEnvironment().apiUrl + '/city/offices',
    })

  // TODO Remove backwards compatibility
  const centerCityOffice = cityOffices?.offices.find(office =>
    (office.title ?? office.location ?? '').includes('Centrum'),
  )

  if (isCityOfficesLoading) {
    return <PleaseWait />
  }

  if (!centerCityOffice) {
    return null
  }

  return <CityOffice id={centerCityOffice.identifier} />
}
