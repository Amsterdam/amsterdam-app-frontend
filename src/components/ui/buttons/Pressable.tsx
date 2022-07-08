import React, {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui'
import {Theme, useThemable} from '@/themes'

type ButtonVariants = 'primary' | 'tertiary'

type Props = {
  children: ReactNode
  variant?: ButtonVariants
} & Omit<PressableRNProps, 'style'> &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'>

export const Pressable = ({
  children,
  variant = 'tertiary',
  ...otherProps
}: Props) => {
  const {inset = 'no', insetHorizontal, insetVertical} = otherProps
  const styles = useThemable(createStyles(variant))

  return (
    <PressableRN
      accessibilityRole="button"
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      {...otherProps}>
      <Box {...{inset, insetHorizontal, insetVertical}}>{children}</Box>
    </PressableRN>
  )
}

const createStyles =
  (variant: ButtonVariants) =>
  ({color}: Theme) =>
    StyleSheet.create({
      button: {
        backgroundColor: color.pressable[variant].default,
      },
      pressed: {
        backgroundColor:
          variant === 'tertiary'
            ? color.pressable.pressed.background
            : color.pressable.primary.highlight,
      },
    })
