import React, {useContext} from 'react'
import {WebView as WebViewRN} from 'react-native-webview'
import {PleaseWait} from './PleaseWait'
import {DeviceContext} from '@/providers'

export type WebViewProps = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  url: string
  urlParams?: {}
}

export const WebView = ({sliceFromTop, url, urlParams}: WebViewProps) => {
  const {isPortrait} = useContext(DeviceContext)

  const params = new URLSearchParams(urlParams)
  const urlWithParams = Object.keys(params).length
    ? url + '?' + params.toString()
    : url

  return (
    <WebViewRN
      renderLoading={() => <PleaseWait />}
      source={{uri: urlWithParams}}
      startInLoadingState
      style={
        sliceFromTop && {
          marginTop: isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
    />
  )
}
