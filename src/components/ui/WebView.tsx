import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {WebView as WebViewRN} from 'react-native-webview'
import {OrientationContext} from '../../providers/orientation.provider'

const WEB_HEADER_HEIGHT = {
  PORTRAIT: 54,
  LANDSCAPE: 134,
}

export const WebView = ({uri}: {uri: string}) => {
  const orientationContext = useContext(OrientationContext)
  return (
    <WebViewRN
      source={{uri}}
      style={orientationContext.portrait ? styles.portrait : styles.landscape}
    />
  )
}

const styles = StyleSheet.create({
  portrait: {
    marginTop: -WEB_HEADER_HEIGHT.PORTRAIT,
  },
  landscape: {
    marginTop: -WEB_HEADER_HEIGHT.LANDSCAPE,
  },
})
