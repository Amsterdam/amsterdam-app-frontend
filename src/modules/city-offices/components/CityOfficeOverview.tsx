import React from 'react'
import {CityOffice} from './CityOffice'
import {Box, PleaseWait} from '@/components/ui'
import {Grid, GridCell} from '@/components/ui/layout'
import {useGetCityOfficesQuery} from '@/modules/city-offices/services'

export const CityOfficeOverview = () => {
  const {data: cityOffices, isLoading: isCityOfficesLoading} =
    useGetCityOfficesQuery()

  if (isCityOfficesLoading || !cityOffices?.offices) {
    return <PleaseWait />
  }

  return (
    <Box>
      <Grid>
        {cityOffices.offices.map(cityOffice => (
          <GridCell key={cityOffice.identifier}>
            <CityOffice
              id={cityOffice.identifier}
              key={cityOffice.identifier}
            />
          </GridCell>
        ))}
      </Grid>
    </Box>
  )
}
