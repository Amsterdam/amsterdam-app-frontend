import React from 'react'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {CityOffices} from '../../../types/city'
import {Card, PleaseWait} from '../../ui'
import {Column} from '../../ui/layout'
import {CityOffice} from './CityOffice'

export const CityOfficeOverview = () => {
  const {data: cityOffices, isLoading: isCityOfficesLoading} =
    useFetch<CityOffices>({
      url: getEnvironment().apiUrl + '/city/offices',
    })

  if (isCityOfficesLoading || !cityOffices?.offices) {
    return <PleaseWait />
  }

  return (
    <Column gutter="md">
      {cityOffices.offices.map(cityOffice => (
        <Card key={cityOffice.identifier}>
          <CityOffice id={cityOffice.identifier} key={cityOffice.identifier} />
        </Card>
      ))}
    </Column>
  )
}
