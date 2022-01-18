import React from 'react'
import {
  CityOfficeOverview,
  ReferToWebsiteCard,
} from '../components/features/contact'
import {Box} from '../components/ui'
import {Column, ScrollView} from '../components/ui/layout'

export const ContactScreen = () => (
  <ScrollView>
    <Box>
      <Column gutter="md">
        <CityOfficeOverview />
        <ReferToWebsiteCard />
      </Column>
    </Box>
  </ScrollView>
)
