import React, {useContext} from 'react'
import {ActivityIndicator, ScrollView} from 'react-native'
import {
  CenterCityOffice,
  ProvideAddressBanner,
  QuickLinks,
  RecentNews,
} from '../components/features/home'
import {Box} from '../components/ui'
import {Column, Gutter} from '../components/ui/layout'
import {SettingsContext} from '../providers'

export const HomeScreen = () => {
  const {isLoading, settings} = useContext(SettingsContext)

  console.log({isLoading, settings})

  return (
    <ScrollView>
      <Box background="white">
        <Column gutter="lg">
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            !settings?.address && <ProvideAddressBanner />
          )}
          <QuickLinks />
        </Column>
      </Box>
      <Box>
        <RecentNews />
      </Box>
      <Box insetHorizontal="md">
        <CenterCityOffice />
        <Gutter height="md" />
      </Box>
    </ScrollView>
  )
}
