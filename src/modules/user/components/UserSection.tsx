import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: React.ReactNode
  title: string
}

export const UserSection = ({children, title}: Props) => {
  const styles = useThemable(createStyles)
  return (
    <Column gutter="sm">
      <View style={styles.header}>
        <Text small accessibilityRole="header">
          {title}
        </Text>
      </View>
      <View style={styles.body}>{children}</View>
    </Column>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    body: {
      paddingHorizontal: size.spacing.md,
      paddingVertical: size.spacing.sm,
      backgroundColor: color.box.background.white,
      borderBottomColor: color.border.onGrey,
      borderTopColor: color.border.onGrey,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    header: {
      paddingHorizontal: size.spacing.md,
    },
  })
