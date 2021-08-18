import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {Box, Gutter, ScreenWrapper} from '../../components/ui'
import {size} from '../../tokens'
import {
  WasteGuideByAddress,
  WasteNotCollectedReport,
  WasteRecyclingBanner,
} from './'

export const WasteGuideScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView>
        <Box>
          <WasteGuideByAddress />
          <Gutter height={size.spacing.md} />
          <WasteRecyclingBanner />
          <Gutter height={size.spacing.md} />
          <WasteNotCollectedReport navigation={useNavigation()} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
