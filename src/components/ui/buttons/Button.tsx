import React, {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet} from 'react-native'
import {Text} from '@/components/ui/'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

type Props = {
  icon?: ReactNode
  text?: string
  variant?: 'inverse' | 'primary' | 'secondary' | 'text'
  width?: 'full' | 'auto'
} & Omit<PressableProps, 'style'>

export const Button = ({
  icon,
  text,
  variant = 'primary',
  width = 'full',
  ...otherProps
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityRole="button"
      style={({pressed}) => [
        styles.button,
        styles[variant],
        width === 'auto' && styles.auto,
        pressed && styles.pressed,
      ]}
      {...otherProps}>
      <Row gutter="md">
        {icon && <Icon size={24}>{icon}</Icon>}
        {text && (
          <Text
            inverse={variant !== 'text'}
            primary={variant === 'inverse'}
            link={variant === 'text'}>
            {text}
          </Text>
        )}
      </Row>
    </Pressable>
  )
}

const createStyles = ({color, text, size}: Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexShrink: 1,
      paddingHorizontal: size.spacing.md,
      paddingVertical: (44 - text.fontSize.body * text.lineHeight.body) / 2, // Design system: button height must be 44
    },
    auto: {
      alignSelf: 'flex-start',
    },
    inverse: {
      backgroundColor: color.box.background.white,
      borderColor: color.pressable.default.background,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    primary: {
      backgroundColor: color.pressable.default.background,
    },
    secondary: {
      backgroundColor: color.pressable.secondary.background,
    },
    text: {
      backgroundColor: undefined,
      color: color.pressable.default.background,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    pressed: {},
  })
