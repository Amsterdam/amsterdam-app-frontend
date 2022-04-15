import React from 'react'
import {StyleSheet} from 'react-native'
import {Center} from './layout'
import {Spinner} from './'

type Props = {
  fullSize?: boolean
}

export const PleaseWait = ({fullSize = true}: Props) => (
  <Center style={fullSize && styles.fullSize}>
    <Spinner />
  </Center>
)

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
})
