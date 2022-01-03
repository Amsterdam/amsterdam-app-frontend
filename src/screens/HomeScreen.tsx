import React from 'react'
import {ScrollView} from 'react-native'
import {BestWishes21Banner} from '../components/features/best-wishes-21'
import {QuickLinks} from '../components/features/home'
import {Box} from '../components/ui'
import {Column} from '../components/ui/layout'

export const HomeScreen = () => (
  <ScrollView>
    <Box background="white">
      <Column gutter="lg">
        <BestWishes21Banner />
        <QuickLinks />
      </Column>
    </Box>
  </ScrollView>
)
