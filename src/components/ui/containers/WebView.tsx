import React, {useContext} from 'react'
import {WebView as WebViewRN, WebViewProps} from 'react-native-webview'
import {PleaseWait} from '@/components/ui/feedback'
import {DeviceContext} from '@/providers'

export type Props = {
  sliceFromTop?: {
    portrait: number
    landscape: number
  }
  url: string
  urlParams?: Record<string, string>
} & WebViewProps

export const WebView = ({
  sliceFromTop,
  url,
  urlParams,
  ...webViewProps
}: Props) => {
  const {isPortrait} = useContext(DeviceContext)

  const params = new URLSearchParams(urlParams)
  const urlWithParams =
    urlParams && Object.keys(urlParams).length
      ? url + '?' + params.toString()
      : url

  return (
    <WebViewRN
      renderLoading={() => <PleaseWait />}
      source={{uri: urlWithParams}}
      startInLoadingState
      style={
        !!sliceFromTop && {
          marginTop: isPortrait
            ? -sliceFromTop.portrait
            : -sliceFromTop.landscape,
        }
      }
      {...webViewProps}
    />
  )
}
