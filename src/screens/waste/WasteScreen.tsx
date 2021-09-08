import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {Box, Gutter} from '../../components/ui'
import {size} from '../../tokens'
import {
  RecyclingGuideBanner,
  ReportNotCollectedBanner,
  WasteGuideByAddress,
} from './'

export const WasteScreen = () => {
  return (
    <ScrollView>
      <WasteGuideByAddress />
      <Box>
        <RecyclingGuideBanner />
        <Gutter height={size.spacing.md} />
        <ReportNotCollectedBanner navigation={useNavigation()} />
      </Box>
    </ScrollView>
  )
}
