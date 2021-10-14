import React, {useContext} from 'react'
import {WebView as WebViewRN} from 'react-native-webview'
import {DeviceContext} from '../../providers'

export type WebViewProps = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  url: string
}

export const WebView = ({sliceFromTop, url}: WebViewProps) => {
  const deviceContext = useContext(DeviceContext)

  return (
    <WebViewRN
      source={{uri: url}}
      style={
        sliceFromTop && {
          marginTop: deviceContext.isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
    />
  )
}
