import React from 'react'
import {StyleSheet, View} from 'react-native'

export const FullSpaceContainer = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
