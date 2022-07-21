import React from 'react'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'

export const RecyclingGuideScreen = () => (
  <Screen scroll={false}>
    <WebView url="https://www.afvalscheidingswijzer.nl" />
  </Screen>
)
