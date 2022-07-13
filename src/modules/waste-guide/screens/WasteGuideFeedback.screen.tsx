import React from 'react'
import {WebView} from '@/components/ui'

export const WasteGuideFeedbackScreen = () => (
  <WebView
    sliceFromTop={{portrait: 161, landscape: 207}}
    url={
      'https://formulier.amsterdam.nl/thema/afval-grondstoffen/klopt-afvalwijzer/Reactie/'
    }
  />
)
