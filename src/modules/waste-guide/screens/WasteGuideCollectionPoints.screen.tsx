import React from 'react'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'

export const WasteGuideCollectionPointsScreen = () => (
  <Screen>
    <WebView
      sliceFromTop={{portrait: 50, landscape: 50}}
      url={
        'https://kaart.amsterdam.nl/#52.2744/4.7151/52.4355/5.0667/brt/9776/244/'
      }
    />
  </Screen>
)
