import React from 'react'
import {WebView} from '../../../components/ui'

export const WasteGuideContainersScreen = () => (
  <WebView
    sliceFromTop={{portrait: 50, landscape: 50}}
    url={
      'https://kaart.amsterdam.nl/afvalcontainers#17/52.36306/4.90720/brt/12491,12492,12493,12494,12495,12496,12497//'
    }
  />
)
