import React from 'react'
import {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {WebView as WebViewRN} from 'react-native-webview'
import {OrientationContext} from '../../providers/orientation.provider'

export const WebView = ({uri}: {uri: string}) => {
  const orientationContext = useContext(OrientationContext)
  return (
    <WebViewRN
      source={{uri}}
      style={
        orientationContext.orientation === 'portrait'
          ? styles.portrait
          : styles.landscape
      }
    />
  )
}

const styles = StyleSheet.create({
  portrait: {
    marginTop: -54,
  },
  landscape: {
    marginTop: -134,
  },
})
