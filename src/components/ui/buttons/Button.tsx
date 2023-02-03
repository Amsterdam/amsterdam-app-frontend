import {useState} from 'react'
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

export type ButtonProps = {
  ellipsizeMode?: 'head' | 'tail' | 'middle' | 'clip'
  iconName?: IconName
  label?: string
  numberOfLines?: number
  small?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary'
} & Omit<PressableProps, 'style'>

export const Button = ({
  ellipsizeMode,
  iconName,
  label,
  numberOfLines,
  small,
  testID,
  variant = 'primary',
  ...pressableProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(createStyles({small, variant}, isPressed))

  const mergeOnPressIn = (e: GestureResponderEvent) => {
    setIsPressed(true)
    pressableProps.onPressIn?.(e)
  }

  const mergeOnPressOut = (e: GestureResponderEvent) => {
    setIsPressed(false)
    pressableProps.onPressOut?.(e)
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      testID={testID}
      {...pressableProps}>
      <Row gutter="sm" valign="center">
        {!!iconName && (
          <Icon
            color={variant === 'primary' ? 'inverse' : 'link'}
            name={iconName}
            size="lg"
            testID={testID ? `${testID}Icon` : undefined}
          />
        )}
        {!!label && (
          <Text
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={styles.label}
            testID={testID ? `${testID}Label` : undefined}>
            {label}
          </Text>
        )}
      </Row>
    </Pressable>
  )
}

// TODO Improve color tokens
const createStyles =
  ({small, variant}: Partial<ButtonProps>, pressed: boolean) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = 48 // Design system requirement
    const borderWidth =
      border.width[variant === 'secondary' && pressed ? 'lg' : 'md']
    const labelFontSize = text.fontSize[small ? 'small' : 'body']
    const labelLineHeight = text.lineHeight[small ? 'small' : 'body']

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
        fontFamily: text.fontFamily.regular,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight * labelFontSize,
      },
    })
  }
