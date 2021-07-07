import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Spacing, spacing} from '../../tokens'

type Props = {
  children: React.ReactNode
  size?: keyof Spacing
}

export const Inset = ({children, size = 'md'}: Props) => {
  const styles = StyleSheet.create({
    inset: {
      padding: spacing[size],
    },
  })

  return <View style={styles.inset}>{children}</View>
}
