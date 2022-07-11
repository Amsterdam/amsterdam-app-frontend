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

// TODO Improve color tokens
const createStyles =
  (variant: ButtonProps['variant'], pressed: boolean) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = 48 // Design system requirement
    const borderWidth =
      variant === 'secondary' && pressed ? border.width.lg : border.width.md
    const labelFontSize = text.fontSize.body
    const labelLineHeight = text.lineHeight.body

    const backgroundColor = () => {
      if (variant === 'primary') {
        return pressed
          ? color.pressable.primary.highlight
          : color.pressable.primary.default
      }

      return color.box.background.white
    }

    const borderColor = () => {
      if (variant === 'primary') {
        return 'transparent'
      }

      if (variant === 'secondary') {
        return pressed
          ? color.pressable.primary.highlight
          : color.pressable.primary.default
      }

      if (variant === 'tertiary') {
        return pressed ? color.pressable.pressed.background : 'transparent'
      }
    }

    const labelColor = () => {
      if (variant === 'primary') {
        return color.text.inverse
      }

      return pressed
        ? color.pressable.primary.highlight
        : color.pressable.primary.default
    }

    const paddingHorizontal =
      size.spacing.md + 2 + border.width.md - borderWidth

    const paddingVertical =
      (buttonHeight - labelFontSize * labelLineHeight - 2 * borderWidth) / 2

    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexShrink: 1,
        paddingHorizontal,
        paddingVertical,
        backgroundColor: backgroundColor(),
        borderColor: borderColor(),
        borderStyle: 'solid',
        borderWidth: borderWidth,
      },
      label: {
        flexShrink: 1,
        color: labelColor(),
        fontFamily: text.fontWeight.bold,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight * labelFontSize,
      },
    })
  }
