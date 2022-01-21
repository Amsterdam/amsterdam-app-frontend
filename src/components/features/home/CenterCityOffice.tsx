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

  const centerCityOffice = cityOffices?.offices.find(office =>
    office.location.includes('Centrum'),
  )

  if (isCityOfficesLoading || !centerCityOffice) {
    return <PleaseWait />
  }

  return <CityOffice id={centerCityOffice.identifier} />
}
