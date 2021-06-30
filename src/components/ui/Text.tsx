import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {fontFamily} from '../../tokens'

type TextProps = {
  children: React.ReactNode
  variant?: 'default' | 'inverse'
} & Omit<TextRNProps, 'style'>

export const Text = ({
  children,
  variant = 'default',
  ...otherProps
}: TextProps) => {
  return (
    <TextRN style={[styles.default, styles[variant]]} {...otherProps}>
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
    color: 'white',
  },
})
