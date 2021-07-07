import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, font, fontFamily} from '../../tokens'

type Props = {
  children: React.ReactNode
  inverse?: Boolean
  prose?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({children, inverse, prose, ...otherProps}: Props) => {
  const fontStyles = prose
    ? font.p1
    : {...font.p1, marginTop: undefined, marginBottom: undefined}

  return (
    <TextRN style={[fontStyles, inverse && styles.inverse]} {...otherProps}>
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
