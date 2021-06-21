import React from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import {fontFamily, fontSize} from '../../tokens'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'buttonPrimary'
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
  buttonPrimary: {
    fontFamily: fontFamily.demiBold,
    color: 'white',
  },
})

export default Text
