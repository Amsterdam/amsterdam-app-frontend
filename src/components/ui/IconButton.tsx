import React, {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet, View} from 'react-native'
import {size as sizeTokens} from '../../tokens'
import {Badge, BadgeProps} from './Badge'

type Props = {
  /**
   * The value for a badge to be displayed on top of the icon.
   */
  badgeValue?: BadgeProps['value']
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
} & Omit<
  PressableProps,
  'accessibilityLabel' | 'accessibilityRole' | 'hitSlop' | 'style'
>

const hitSlopSize = sizeTokens.spacing.sm

export const IconButton = ({
  badgeValue,
  icon,
  label,
  size = 24,
  ...props
}: Props) => (
  <Pressable
    accessibilityLabel={label}
    accessibilityRole="button"
    hitSlop={hitSlopSize}
    style={dynamicStyles(size).pressable}
    {...props}>
    {icon}
    {badgeValue ? (
      <View style={styles.badgePosition}>
        <Badge accessible={false} value={badgeValue} />
      </View>
    ) : null}
  </Pressable>
)

const dynamicStyles = (size: number) =>
  StyleSheet.create({
    pressable: {
      width: size,
      height: size,
    },
  })

const styles = StyleSheet.create({
  badgePosition: {
    position: 'absolute',
    top: -hitSlopSize,
    right: -hitSlopSize,
    left: -hitSlopSize,
    alignItems: 'flex-end',
  },
})
