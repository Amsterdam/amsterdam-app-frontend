import React from 'react'
import {Box} from '../../components/ui'
import {Column, ScrollView} from '../../components/ui/layout'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from './components'

export const CityOfficesScreen = () => (
  <ScrollView>
    <Box>
      <Column gutter="md">
        <CityOfficeOverview />
        <ReferToWebsiteCard />
      </Column>
    </Box>
    <ContactOptions />
  </ScrollView>
)
