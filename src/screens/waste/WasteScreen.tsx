import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {Box, Gutter} from '../../components/ui'
import {size} from '../../tokens'
import {WasteGuideByAddress} from './waste-guide'
import {RecyclingGuideBanner, ReportNotCollectedBanner} from './'

export const WasteScreen = () => {
  return (
    <ScrollView>
      <WasteGuideByAddress />
      <Box background="lighter">
        <RecyclingGuideBanner />
        <Gutter height={size.spacing.md} />
        <ReportNotCollectedBanner navigation={useNavigation()} />
      </Box>
    </ScrollView>
  )
}
