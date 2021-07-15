import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  level?: 1 | 2 | 3 | 4
  inverse?: Boolean
  margin?: Boolean
  text: string
}

export const Title = ({level = 1, inverse, margin, text}: Props) => {
  const fontStyles = [styles.h1, styles.h2, styles.h3, styles.h4][level - 1]
  const marginStyles = [styles.h1m, styles.h2m, styles.h3m, styles.h4m][
    level - 1
  ]

  return (
    <Text
      style={[fontStyles, margin && marginStyles, inverse && styles.inverse]}>
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  h1: {
    color: font.fontColor.regular,
    fontFamily: font.fontFamily.demi,
    fontSize: font.fontSize.h1,
    lineHeight: font.lineHeight.h1,
  },
  h1m: {
    marginBottom: font.marginBottom.h1,
    marginTop: font.marginTop.h1,
  },
  h2: {
    color: font.fontColor.regular,
    fontFamily: font.fontFamily.demi,
    fontSize: font.fontSize.h2,
    lineHeight: font.lineHeight.h2,
  },
  h2m: {
    marginBottom: font.marginBottom.h2,
    marginTop: font.marginTop.h2,
  },
  h3: {
    color: font.fontColor.regular,
    fontFamily: font.fontFamily.demi,
    fontSize: font.fontSize.h3,
    lineHeight: font.lineHeight.h3,
  },
  h3m: {
    marginBottom: font.marginBottom.h3,
    marginTop: font.marginTop.h3,
  },
  h4: {
    color: font.fontColor.regular,
    fontFamily: font.fontFamily.demi,
    fontSize: font.fontSize.h4,
    lineHeight: font.lineHeight.h4,
  },
  h4m: {
    marginBottom: font.marginBottom.h4,
    marginTop: font.marginTop.h4,
  },
  inverse: {
    color: color.bright.main,
  },
})
