import {useCallback, useState} from 'react'
import {FlexStyle, GestureResponderEvent, StyleSheet} from 'react-native'
import {
  PressableBaseProps,
  PressableBase,
} from '@/components/ui/buttons/PressableBase'
import {config} from '@/components/ui/config'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {IconSize} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'secondaryDestructive'

export type ButtonProps = {
  ellipsizeMode?: 'head' | 'tail' | 'middle' | 'clip'
  iconName?: SvgIconName
  iconSize?: keyof typeof IconSize
  isError?: boolean
  isLoading?: boolean
  label?: string
  numberOfLines?: number
  small?: boolean
  underline?: boolean
  variant?: ButtonVariant
} & Omit<PressableBaseProps, 'style' | 'children'> &
  FlexStyle

const defaultVariant = 'primary'

export const Button = ({
  ellipsizeMode,
  iconName: iconNameInput,
  iconSize = 'lg',
  isError,
  isLoading,
  label,
  numberOfLines,
  small,
  testID,
  underline,
  variant = defaultVariant,
  ...pressableProps
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(
    createStyles({small, variant}, isPressed, underline),
  )
  const {onPressIn, onPressOut} = pressableProps

  const mergeOnPressIn = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(true)
      onPressIn?.(e)
    },
    [onPressIn],
  )

  const mergeOnPressOut = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(false)
      onPressOut?.(e)
    },
    [onPressOut],
  )

  const iconName = isLoading ? 'spinner' : isError ? 'alert' : iconNameInput

  return (
    <PressableBase
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      testID={testID}
      {...pressableProps}>
      <Row gutter="sm">
        {!!iconName && (
          <Icon
            color={variant === 'primary' ? 'inverse' : 'link'}
            name={iconName}
            size={iconSize}
            testID={`${testID}Icon`}
          />
        )}
        {!!label && (
          <AccessibleText
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines}
            style={styles.label}
            testID={`${testID}Label`}>
            {label}
          </AccessibleText>
        )}
      </Row>
    </PressableBase>
  )
}

const getBorderColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].border

const getLabelColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].label

const getBackgroundColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: ButtonProps['variant'] = defaultVariant,
) => color.pressable[variant][isPressed ? 'pressed' : 'default'].background

const createStyles =
  (
    {small, variant}: Partial<ButtonProps>,
    isPressed: boolean,
    underline?: boolean,
  ) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = config.buttonHeight
    const borderWidth =
      border.width[variant === 'secondary' && isPressed ? 'lg' : 'md']
    const labelFontSize = text.fontSize[small ? 'small' : 'body']
    const labelLineHeight = text.lineHeight[small ? 'small' : 'body']

    const paddingHorizontal =
      size.spacing.md + 2 + border.width.md - borderWidth

    const paddingVertical =
      (buttonHeight - labelLineHeight - 2 * borderWidth) / 2

    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexShrink: 1,
        paddingHorizontal,
        paddingVertical,
        backgroundColor: getBackgroundColor(color, isPressed, variant),
        borderColor: getBorderColor(color, isPressed, variant),
        borderStyle: 'solid',
        borderWidth,
      },
      // TODO Use `Phrase` instead, after merging line height branch
      label: {
        flexShrink: 1,
        color: getLabelColor(color, isPressed, variant),
        fontFamily: text.fontFamily.regular,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        textDecorationLine: underline ? 'underline' : 'none',
      },
    })
  }
