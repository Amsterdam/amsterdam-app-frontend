import React from 'react'
import {SafeAreaView} from 'react-native'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from '../components/features/contact'
import {Box} from '../components/ui'
import {Column, ScrollView} from '../components/ui/layout'

export const ContactScreen = () => (
  <SafeAreaView>
    <ScrollView>
      <Box>
        <Column gutter="md">
          <CityOfficeOverview />
          <ReferToWebsiteCard />
        </Column>
      </Box>
      <ContactOptions />
    </ScrollView>
  </SafeAreaView>
)
