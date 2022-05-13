import React from 'react'
import {ScrollView} from 'react-native'
import {
  ProvideAddressBanner,
  QuickLinks,
  RecentNews,
} from '../components/features/home'
import {Box} from '../components/ui'
import {Gutter} from '../components/ui/layout'

export const HomeScreen = () => {
  return (
    <ScrollView>
      <Box background="white">
        <ProvideAddressBanner />
        <QuickLinks />
      </Box>
      <Box>
        <RecentNews />
      </Box>
      <Box insetHorizontal="md">
        <Gutter height="md" />
      </Box>
    </ScrollView>
  )
}
