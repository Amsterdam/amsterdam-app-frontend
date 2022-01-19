import React from 'react'
import {ScrollView} from 'react-native'
import {ProvideAddressBanner, QuickLinks} from '../components/features/home'
import {Box} from '../components/ui'
import {Column} from '../components/ui/layout'

export const HomeScreen = () => (
  <ScrollView>
    <Box background="white">
      <Column gutter="lg">
        <ProvideAddressBanner />
        <QuickLinks />
      </Column>
    </Box>
  </ScrollView>
)
