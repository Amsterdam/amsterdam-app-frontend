import React from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: React.ReactNode
}

export const Center = ({children}: Props) => (
  <View style={styles.center}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
