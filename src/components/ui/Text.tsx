import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, font, fontFamily, fontMargin} from '../../tokens'

type Props = {
  children: React.ReactNode
  inverse?: Boolean
  margin?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({children, inverse, margin, ...otherProps}: Props) => {
  return (
    <TextRN
      style={[font.p1, margin && fontMargin.p1, inverse && styles.inverse]}
      {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  inverse: {
    color: color.bright.main,
    fontFamily: fontFamily.demi,
  },
})
