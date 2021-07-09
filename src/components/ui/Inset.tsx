import React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {Spacing, spacing} from '../../tokens'

type Props = {
  children: React.ReactNode
  size?: keyof Spacing
} & ViewProps

export const Inset = ({children, size = 'md', style}: Props) => {
  const styles = StyleSheet.create({
    inset: {
      padding: spacing[size],
    },
  })

  return <View style={[styles.inset, style]}>{children}</View>
}
