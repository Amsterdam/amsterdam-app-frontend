import React from 'react'
import {PleaseWait} from '../../../components/ui'
import {Grid, GridCell} from '../../../components/ui/layout'
import {useGetCityOfficesQuery} from '../../../services'
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
