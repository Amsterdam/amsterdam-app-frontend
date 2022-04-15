import React from 'react'
import {StyleSheet} from 'react-native'
import {Center} from './layout'
import {Spinner} from './'

export const PleaseWait = () => (
  <Center style={styles.fullSize}>
    <Spinner />
  </Center>
)

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
})
