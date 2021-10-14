import React, {useContext} from 'react'
import {WebView as WebViewRN} from 'react-native-webview'
import {DeviceContext} from '../../providers'

export type WebViewProps = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  url: string
  urlParams?: {}
}

export const WebView = ({sliceFromTop, url, urlParams}: WebViewProps) => {
  const deviceContext = useContext(DeviceContext)

  const params = new URLSearchParams(urlParams)
  const urlWithParams = Object.keys(params).length
    ? url + '?' + params.toString()
    : url

  return (
    <WebViewRN
      source={{uri: urlWithParams}}
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
