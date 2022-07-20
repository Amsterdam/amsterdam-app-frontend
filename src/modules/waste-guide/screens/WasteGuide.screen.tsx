import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Gutter, Screen} from '@/components/ui/layout'
import {
  RecyclingGuideBanner,
  ReportNotCollectedBanner,
  WasteGuideByAddress,
} from '@/modules/waste-guide/components'

export const WasteGuideScreen = () => {
  return (
    <Screen scroll>
      <WasteGuideByAddress />
      <RecyclingGuideBanner />
      <Gutter height="md" />
      <ReportNotCollectedBanner navigation={useNavigation()} />
    </Screen>
  )
}
