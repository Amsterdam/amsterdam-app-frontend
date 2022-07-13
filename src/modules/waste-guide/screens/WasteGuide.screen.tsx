import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Gutter, Screen, ScrollView} from '../../../components/ui/layout'
import {WasteGuideByAddress} from '../components'
import {RecyclingGuideBanner} from '../components/RecyclingGuideBanner'
import {ReportNotCollectedBanner} from '../components/ReportNotCollectedBanner'

export const WasteGuideScreen = () => {
  return (
    <Screen>
      <ScrollView>
        <WasteGuideByAddress />
        <RecyclingGuideBanner />
        <Gutter height="md" />
        <ReportNotCollectedBanner navigation={useNavigation()} />
      </ScrollView>
    </Screen>
  )
}
