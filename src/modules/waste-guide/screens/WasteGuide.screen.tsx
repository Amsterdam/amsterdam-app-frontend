import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Gutter, Screen, ScrollView} from '@/components/ui/layout'
import {
  RecyclingGuideBanner,
  ReportNotCollectedBanner,
  WasteGuideByAddress,
} from '@/modules/waste-guide/components'

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
