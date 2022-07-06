import React, {ReactNode, useState} from 'react'
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native'
import {Text} from '@/components/ui/'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export type ButtonProps = {
  icon?: ReactNode
  label?: string
  variant?: 'primary' | 'secondary' | 'text'
} & Omit<PressableProps, 'style'>

export const Button = ({
  icon,
  label,
  variant = 'primary',
  ...otherProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(createStyles(isPressed))

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
      style={[styles.button, styles[variant]]}
      {...otherProps}>
      <Row gutter="md">
        {icon && <Icon size={24}>{icon}</Icon>}
        {label && (
          <Text inverse={variant === 'primary'} link={variant === 'text'}>
            {label}
          </Text>
        )}
      </Row>
    </Pressable>
  )
}

const createStyles =
  (pressed: boolean) =>
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
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: border.width.md,
      },
      primary: {
        backgroundColor: pressed
          ? color.pressable.primary.highlight
          : color.pressable.primary.default,
        borderColor: pressed
          ? color.pressable.primary.highlight
          : color.pressable.primary.default,
      },
      secondary: {
        backgroundColor: color.box.background.white,
        borderColor: pressed
          ? color.pressable.primary.highlight
          : color.pressable.primary.default,
      },
      text: {
        backgroundColor: undefined,
        color: color.pressable.default.background,
        paddingHorizontal: 0,
        paddingVertical: 0,
      },
    })
