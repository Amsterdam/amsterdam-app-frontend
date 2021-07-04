import React from 'react'
import {StyleSheet, View} from 'react-native'

type Props = {
  children: React.ReactNode
  length?: number
}

export const Inset = ({children, length = 15}: Props) => {
  const styles = StyleSheet.create({
    inset: {
      padding: length,
    },
  })

  return <View style={styles.inset}>{children}</View>
}
