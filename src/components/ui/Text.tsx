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
    fontFamily: font.fontFamily.demi,
  },
  margin: {
    marginBottom: font.marginBottom.p1,
    marginTop: font.marginTop.p1,
  },
  text: {
    fontFamily: font.fontFamily.regular,
    fontSize: font.fontSize.p1,
    lineHeight: font.lineHeight.p1,
    color: font.fontColor.regular,
  },
})
