import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, fontFamily} from '../../tokens'

type TextProps = {
  children: React.ReactNode
  inverse?: Boolean
  variant?: 'default' | 'inverse'
} & Omit<TextRNProps, 'style'>

export const Text = ({
  children,
  inverse,
  variant = 'default',
  ...otherProps
}: TextProps) => {
  return (
    <TextRN
      style={[styles.default, styles[variant], inverse && styles.inverse]}
      {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  inverse: {
    fontFamily: fontFamily.demi,
    color: color.bright.main,
  },
})
