import React from 'react'
import {ScrollView} from 'react-native'
import {BestWishes21Banner} from '../components/features/best-wishes-21'
import {Box} from '../components/ui'

export const HomeScreen = () => (
  <ScrollView>
    <Box background="white">
      <BestWishes21Banner />
    </Box>
  </ScrollView>
)
