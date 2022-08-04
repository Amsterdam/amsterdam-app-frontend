import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: ReactNode
}

export const Center = ({children}: Props) => (
  <View style={styles.center}>{children}</View>
)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
