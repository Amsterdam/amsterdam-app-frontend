import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  warning?: boolean
}

export const Attention = ({children, warning}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View
      accessibilityLanguage="nl-NL"
      accessibilityRole="alert"
      style={[styles.attention, warning && styles.warning]}>
      {children}
    </View>
  )
}

const borderWidth = 2

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    attention: {
      borderLeftColor: color.border.primary,
      borderLeftWidth: borderWidth,
      paddingLeft: size.spacing.md - borderWidth,
    },
    warning: {
      borderLeftColor: color.border.invalid,
    },
  })
