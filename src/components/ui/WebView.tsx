import React, {useContext} from 'react'
import {WebView as WebViewRN} from 'react-native-webview'
import {OrientationContext} from '../../providers'

export type WebViewProps = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  uri: string
}

export const WebView = ({sliceFromTop, uri}: WebViewProps) => {
  const orientationContext = useContext(OrientationContext)

  return (
    <WebViewRN
      source={{uri}}
      style={
        sliceFromTop && {
          marginTop: orientationContext.isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
    />
  )
}
