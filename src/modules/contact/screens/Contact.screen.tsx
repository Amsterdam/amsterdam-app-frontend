import React from 'react'
import {Screen} from '@/components/ui/layout'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from '@/modules/contact/components'

export const ContactScreen = () => (
  <Screen>
    <CityOfficeOverview />
    <ReferToWebsiteCard />
    <ContactOptions />
  </Screen>
)
