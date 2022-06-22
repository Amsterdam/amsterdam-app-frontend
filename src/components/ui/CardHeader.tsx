import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
}

export const CardHeader = ({children}: Props) => {
  const styles = useThemable(createStyles)

  return <View style={styles.cardHeader}>{children}</View>
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    cardHeader: {
      paddingHorizontal: size.spacing.md,
      paddingVertical: size.spacing.sm,
      borderBottomColor: color.border.default,
      borderBottomWidth: 1,
    },
  })
