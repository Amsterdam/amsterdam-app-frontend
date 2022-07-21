import React from 'react'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'

export const WasteGuideFeedbackScreen = () => (
  <Screen scroll={false}>
    <WebView
      sliceFromTop={{portrait: 161, landscape: 207}}
      url={
        'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'
      }
    />
  </Screen>
)
