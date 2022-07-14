import React from 'react'
import {Screen, ScrollView} from '@/components/ui/layout'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from '@/modules/contact/components'

export const ContactScreen = () => (
  <Screen>
    <ScrollView>
      <CityOfficeOverview />
      <ReferToWebsiteCard />
      <ContactOptions />
    </ScrollView>
  </Screen>
)
