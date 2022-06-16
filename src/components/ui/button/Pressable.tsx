import React, {ReactNode, useState} from 'react'
import {
  Pressable as PressableRN,
  PressableProps as PressableRNProps,
  StyleSheet,
} from 'react-native'
import {Box, BoxProps} from '@/components/ui'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
} & Pick<BoxProps, 'inset' | 'insetHorizontal' | 'insetVertical'> &
  Omit<PressableRNProps, 'onPressIn' | 'onPressOut'>

export const Pressable = ({children, ...otherProps}: Props) => {
  const [isPressed, setPressed] = useState(false)
  const {inset = 'no', insetHorizontal, insetVertical} = otherProps
  const styles = useThemable(createStyles)

  return (
    <PressableRN
      accessibilityRole="button"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...otherProps}
      style={isPressed && styles.pressed}>
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
