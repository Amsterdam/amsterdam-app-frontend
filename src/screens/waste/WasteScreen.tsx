import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {Box, Gutter, ScreenWrapper} from '../../components/ui'
import {size} from '../../tokens'
import {
  RecyclingGuideBanner,
  ReportNotCollectedBanner,
  WasteGuideByAddress,
} from './'

export const WasteScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView>
        <Box>
          <WasteGuideByAddress />
          <Gutter height={size.spacing.md} />
          <RecyclingGuideBanner />
          <Gutter height={size.spacing.md} />
          <ReportNotCollectedBanner navigation={useNavigation()} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
