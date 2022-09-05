import React from 'react'
import {Box} from '@/components/ui'
import {Column, Grid, GridCell} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/components'
import {cityOffices} from '@/modules/contact/data'

export const CityOfficeOverview = () => (
  <Box>
    <Column gutter="sm">
      <Title level="h2" text="Bezoek ons" />
      <Grid>
        {cityOffices.map(cityOffice => (
          <GridCell key={cityOffice.identifier}>
            <CityOffice data={cityOffice} />
          </GridCell>
        ))}
      </Grid>
    </Column>
  </Box>
)
