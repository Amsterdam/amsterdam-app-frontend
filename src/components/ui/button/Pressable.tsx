import React, {useState} from 'react'
import {ReactNode} from 'react'
import {
  Pressable as PressableRN,
  PressableProps,
  StyleSheet,
} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {SpacingTokens} from '@/themes/tokens'

type Props = {
  children: ReactNode
  padding?: keyof SpacingTokens
} & Omit<PressableProps, 'onPressIn' | 'onPressOut'>

export const Pressable = ({children, padding, ...otherProps}: Props) => {
  const styles = useThemable(createStyles({padding}))
  const [isPressed, setPressed] = useState(false)

  return (
    <PressableRN
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...otherProps}
      style={[styles.button, isPressed && styles.pressed]}>
      {children}
    </PressableRN>
  )
}

const createStyles =
  ({padding}: Pick<Props, 'padding'>) =>
  ({color, size}: Theme) =>
    StyleSheet.create({
      button: {
        padding: padding ? size.spacing[padding] : 0,
      },
      pressed: {
        backgroundColor: color.pressable.pressed.background,
      },
    })
