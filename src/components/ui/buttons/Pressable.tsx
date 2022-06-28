import React, {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui'
import {Theme, useThemable} from '@/themes'

export type PressableProps = {
  children: ReactNode
} & Omit<PressableRNProps, 'style'> &
  Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'>

export const Pressable = ({children, ...otherProps}: PressableProps) => {
  const {inset = 'no', insetHorizontal, insetVertical} = otherProps
  const styles = useThemable(createStyles)

  return (
    <PressableRN
      accessibilityRole="button"
      style={({pressed}) => pressed && styles.pressed}
      {...otherProps}>
      <Box {...{inset, insetHorizontal, insetVertical}}>{children}</Box>
    </PressableRN>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    pressed: {
      backgroundColor: color.pressable.pressed.background,
    },
  })
