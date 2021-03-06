import React from 'react'
import {useGetCityOfficesQuery} from '../../../services'
import {PleaseWait} from '../../ui'
import {Grid, GridCell} from '../../ui/layout'
import {CityOffice} from './CityOffice'

export const CityOfficeOverview = () => {
  const {data: cityOffices, isLoading: isCityOfficesLoading} =
    useGetCityOfficesQuery()

  if (isCityOfficesLoading || !cityOffices?.offices) {
    return <PleaseWait />
  }

  return (
    <Grid>
      {cityOffices.offices.map(cityOffice => (
        <GridCell key={cityOffice.identifier}>
          <CityOffice id={cityOffice.identifier} key={cityOffice.identifier} />
        </GridCell>
      ))}
    </Grid>
  )
}
