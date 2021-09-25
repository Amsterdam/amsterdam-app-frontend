import React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type Props = {
  children: React.ReactNode
} & ViewProps

export const Center = ({children}: Props) => (
  <View style={styles.center}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
