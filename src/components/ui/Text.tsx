import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, fontFamily} from '../../tokens'
import {fontColor} from '../../tokens/fontColor'

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
    fontFamily: fontFamily.demi,
  },
  margin: {
    marginTop: 0,
    marginBottom: 22,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
    color: fontColor.regular,
  },
})
