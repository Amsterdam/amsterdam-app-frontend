import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '../../../components/ui/Text'
import {Column} from '../../../components/ui/layout/Column'
import {color, size} from '../../../tokens'

type Props = {
  children: React.ReactNode
  title: string
}

export const SettingsSection = ({children, title}: Props) => {
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

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: size.spacing.md,
    paddingVertical: size.spacing.sm,
    backgroundColor: color.background.white,
    borderBottomColor: color.border.onGrey,
    borderTopColor: color.border.onGrey,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  header: {
    paddingHorizontal: size.spacing.md,
  },
})
