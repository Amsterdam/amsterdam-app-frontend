import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {fontFamily} from '../../tokens'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'inverse'
} & Omit<TextRNProps, 'style'>

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
    fontSize: 16,
  },
  inverse: {
    fontFamily: fontFamily.demi,
    color: 'white',
  },
})

export default Text
