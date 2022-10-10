import React, {SVGProps, useState} from 'react'
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
import {SvgProps} from '@/types'

export type ButtonProps = {
  ellipsizeMode?: 'head' | 'tail' | 'middle' | 'clip'
  icon?: React.FC<SvgProps>
  label?: string
  numberOfLines?: number
  variant?: 'primary' | 'secondary' | 'tertiary'
} & Omit<PressableProps, 'style'>

export const Button = ({
  ellipsizeMode,
  icon: IconComponent,
  label,
  numberOfLines,
  variant = 'primary',
  ...otherProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const iconProps = useThemable(createIconProps(variant))
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
      <Row gutter="sm" valign="center">
        {!!IconComponent && (
          <Icon size={24}>
            <IconComponent {...iconProps} />
          </Icon>
        )}
        {!!label && (
          <Text
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={styles.label}>
            {label}
          </Text>
        )}
      </Row>
    </Pressable>
  )
}

const createIconProps =
  (variant: ButtonProps['variant']) =>
  ({color}: Theme): SVGProps<unknown> => ({
    fill: color.text[variant === 'primary' ? 'inverse' : 'link'],
  })

// TODO Improve color tokens
const createStyles =
  (variant: ButtonProps['variant'], pressed: boolean) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = 48 // Design system requirement
    const borderWidth =
      border.width[variant === 'secondary' && pressed ? 'lg' : 'md']
    const labelFontSize = text.fontSize.small
    const labelLineHeight = text.lineHeight.small

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
        borderWidth,
      },
      // TODO Use `Phrase` instead, after merging line height branch
      label: {
        flexShrink: 1,
        color: labelColor(),
        fontFamily: text.fontWeight.bold,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight * labelFontSize,
      },
    })
  }
