import React from 'react'
import {StyleSheet} from 'react-native'
import {WebView as WebViewRN, WebViewProps} from 'react-native-webview'

const WebView = ({uri}: {uri: string}) => {
  return <WebViewRN source={{uri}} style={styles.withoutHeader} />
}

const styles = StyleSheet.create({
  withoutHeader: {
    marginTop: -52,
  },
})

export default WebView
