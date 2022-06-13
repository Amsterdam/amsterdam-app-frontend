import React, {useState} from 'react'
import {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet, ViewProps} from 'react-native'
import {Theme, useThemable} from '../../../themes'

type Props = {
  children: ReactNode
} & Omit<PressableProps, 'accessibilityRole' | 'onPressIn' | 'onPressOut'> &
  Pick<ViewProps, 'style'>

export const BlockLink = ({children, ...otherProps}: Props) => {
  const styles = useThemable(createStyles)
  const [isPressed, setPressed] = useState(false)

  return (
    <Pressable
      accessibilityRole="button"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...otherProps}
      style={[otherProps.style, isPressed && styles.pressed]}>
      {children}
    </Pressable>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    pressed: {
      backgroundColor: color.pressable.pressed.background,
    },
  })
