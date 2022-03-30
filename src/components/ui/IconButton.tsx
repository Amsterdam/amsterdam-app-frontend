import React, {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet} from 'react-native'
import {size as sizeTokens} from '../../tokens'

type Props = {
  /**
   * The icon to be used.
   */
  icon: ReactNode
  /**
   * A short label representing the concept conveyed by the icon. Gets applied as accessibility label.
   */
  label: string
  /**
   * The width (and height) of the icon. Only square icons are currently supported.
   */
  size?: 24 | 32
} & PressableProps

export const IconButton = ({icon, label, size = 24, ...props}: Props) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    hitSlop={sizeTokens.spacing.sm}
    style={styles(size).pressable}
    {...props}>
    {icon}
  </Pressable>
)

const styles = (size: number) =>
  StyleSheet.create({
    pressable: {
      width: size,
      height: size,
    },
  })
