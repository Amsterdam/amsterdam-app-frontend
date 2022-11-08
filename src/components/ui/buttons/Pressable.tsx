import React, {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui/containers'
import {Theme, useThemable} from '@/themes'

type ButtonVariants = 'primary' | 'tertiary' | 'negative'

export type PressableProps = {
  children: ReactNode
  variant?: ButtonVariants
} & Omit<PressableRNProps, 'style'> &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'>

export const Pressable = ({
  children,
  variant = 'tertiary',
  ...otherProps
}: PressableProps) => {
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
        backgroundColor: color.pressable[variant].highlight,
      },
    })
