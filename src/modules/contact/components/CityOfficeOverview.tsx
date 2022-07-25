import React from 'react'
import {Box, PleaseWait} from '@/components/ui'
import {Grid, GridCell} from '@/components/ui/layout'
import {CityOffice} from '@/modules/contact/components'
import {useGetCityOfficesQuery} from '@/modules/contact/services'

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