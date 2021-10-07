import React, {useContext} from 'react'
import {WebView as WebViewRN} from 'react-native-webview'
import {DeviceContext} from '../../providers'

export type WebViewProps = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  uri: string
}

export const WebView = ({sliceFromTop, uri}: WebViewProps) => {
  const deviceContext = useContext(DeviceContext)

  return (
    <WebViewRN
      source={{uri}}
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
