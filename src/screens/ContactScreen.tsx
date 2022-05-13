import React from 'react'
import {Box} from '../components/ui'
import {Column, ScrollView} from '../components/ui/layout'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from '../modules/city-offices/components'

export const ContactScreen = () => (
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
