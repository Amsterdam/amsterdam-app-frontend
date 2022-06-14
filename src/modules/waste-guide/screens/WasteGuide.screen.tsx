import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from 'react-native'
import {Box} from '../../../components/ui'
import {Gutter} from '../../../components/ui/layout'
import {WasteGuideByAddress} from '../components'
import {RecyclingGuideBanner} from '../components/RecyclingGuideBanner'
import {ReportNotCollectedBanner} from '../components/ReportNotCollectedBanner'

export const WasteGuideScreen = () => {
  return (
    <ScrollView>
      <WasteGuideByAddress />
      <Box background="white">
        <RecyclingGuideBanner />
        <Gutter height="md" />
        <ReportNotCollectedBanner navigation={useNavigation()} />
      </Box>
    </ScrollView>
  )
}