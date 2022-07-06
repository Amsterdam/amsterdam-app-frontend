import React, {ReactNode, useState} from 'react'
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export type ButtonProps = {
  icon?: ReactNode
  label?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
} & Omit<PressableProps, 'style'>

export const Button = ({
  icon,
  label,
  variant = 'primary',
  ...otherProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(createStyles(variant, isPressed))

  const mergeOnPressIn = (e: GestureResponderEvent) => {
    setIsPressed(true)
    otherProps.onPressIn?.(e)
  }

  const mergeOnPressOut = (e: GestureResponderEvent) => {
    setIsPressed(false)
    otherProps.onPressOut?.(e)
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      {...otherProps}>
      <Row gutter="md">
        {icon && <Icon size={24}>{icon}</Icon>}
        {label && <Text style={styles.label}>{label}</Text>}
      </Row>
    </Pressable>
  )
}

// TODO Color tokens
// TODO Ternaries
const createStyles =
  (variant: Pick<Props, 'variant'>, pressed: boolean) =>
  ({border, color, text, size}: Theme) =>
    StyleSheet.create({
      button: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexShrink: 1,
        paddingHorizontal: size.spacing.md + 2, // Why DS why
        paddingVertical:
          (48 - text.fontSize.body * text.lineHeight.body - border.width.md) /
          2, // Design system: button height must be 48
        backgroundColor:
          variant === 'primary'
            ? pressed
              ? color.pressable.primary.highlight
              : color.pressable.primary.default
            : color.box.background.white,
        borderColor:
          variant === 'primary'
            ? 'transparent'
            : variant === 'secondary'
            ? pressed
              ? color.pressable.primary.highlight
              : color.pressable.primary.default
            : variant === 'tertiary'
            ? pressed
              ? color.pressable.pressed.background
              : 'transparent'
            : 'transparent',
        borderStyle: 'solid',
        borderWidth: border.width.md,
      },
      label: {
        flexShrink: 1,
        color:
          variant === 'primary'
            ? color.text.inverse
            : pressed
            ? color.pressable.primary.highlight
            : color.pressable.primary.default,
        fontFamily: text.fontWeight.demi,
        fontSize: text.fontSize.body,
        lineHeight: text.lineHeight.body * text.fontSize.body,
      },
    })
