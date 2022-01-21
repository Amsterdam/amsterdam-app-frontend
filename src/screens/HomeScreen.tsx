import React, {useContext} from 'react'
import {ScrollView} from 'react-native'
import {
  CenterCityOffice,
  ProvideAddressBanner,
  QuickLinks,
} from '../components/features/home'
import {Box} from '../components/ui'
import {Column} from '../components/ui/layout'
import {SettingsContext} from '../providers'

export const HomeScreen = () => {
  const settingsContext = useContext(SettingsContext)

  return (
    <ScrollView>
      <Box background="white">
        <Column gutter="lg">
          {!settingsContext.settings?.address && <ProvideAddressBanner />}
          <QuickLinks />
        </Column>
      </Box>
      <Box>
        <CenterCityOffice />
      </Box>
    </ScrollView>
  )
}
