import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, fontFamily} from '../../tokens'

type Props = {
  children: React.ReactNode
  inverse?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({children, inverse, ...otherProps}: Props) => {
  return (
    <TextRN style={[styles.default, inverse && styles.inverse]} {...otherProps}>
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
