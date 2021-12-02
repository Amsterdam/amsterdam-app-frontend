import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {Center} from './layout'

export const PleaseWait = () => (
  <Center style={styles.fullSize}>
    <ActivityIndicator />
  </Center>
)

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
})
