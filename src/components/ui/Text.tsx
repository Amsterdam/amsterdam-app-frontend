import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  children: React.ReactNode
  inverse?: Boolean
  margin?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({children, inverse, margin, ...otherProps}: Props) => {
  return (
    <TextRN
      style={[styles.text, margin && styles.margin, inverse && styles.inverse]}
      {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  inverse: {
    color: color.bright.main,
    fontFamily: font.weight.demi,
  },
  margin: {
    marginBottom: font.leadingBottom.p1,
    marginTop: font.leadingTop.p1,
  },
  text: {
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    color: color.font.regular,
  },
})
