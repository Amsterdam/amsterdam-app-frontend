import React from 'react'
import {WebView as WebViewRN} from 'react-native-webview'

const WebView = ({uri}: {uri: string}) => {
  return <WebViewRN source={{uri}} />
}

export default WebView
