import React from 'react'
import {WebView as WebViewRN, WebViewProps} from 'react-native-webview'

const WebView = ({uri}: {uri: string} & WebViewProps) => {
  return <WebViewRN source={{uri}} />
}

export default WebView
