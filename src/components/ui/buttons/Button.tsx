import React, {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet} from 'react-native'
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
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityRole="button"
      style={({pressed}) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
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

const createStyles = ({color, text, size}: Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexShrink: 1,
      paddingHorizontal: size.spacing.md,
      paddingVertical: (44 - text.fontSize.body * text.lineHeight.body - 2) / 2, // Design system: button height must be 44
      borderWidth: 1,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: color.box.background.white,
      borderColor: color.pressable.default.background,
      borderStyle: 'solid',
    },
    primary: {
      backgroundColor: color.pressable.default.background,
    },
    text: {
      backgroundColor: undefined,
      color: color.pressable.default.background,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    pressed: {},
  })
