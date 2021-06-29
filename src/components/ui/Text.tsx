import React from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import {fontFamily, fontSize} from '../../tokens'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'inverse'
} & Omit<TextProps, 'style'>

const Text = ({children, variant = 'default', ...otherProps}: Props) => {
  return (
    <TextRN style={[styles.default, styles[variant]]} {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  inverse: {
    fontFamily: fontFamily.demi,
    color: 'white',
  },
})

export default Text
