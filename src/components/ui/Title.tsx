import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, fontFamily} from '../../tokens'
import {fontColor} from '../../tokens/fontColor'

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
    fontFamily: fontFamily.demi,
    fontSize: 24,
    lineHeight: 30,
    color: fontColor.regular,
  },
  h1m: {
    marginTop: 0,
    marginBottom: 30,
  },
  h2: {
    fontFamily: fontFamily.demi,
    fontSize: 20,
    lineHeight: 28,
    color: fontColor.regular,
  },
  h2m: {
    marginTop: 0,
    marginBottom: 28,
  },
  h3: {
    fontFamily: fontFamily.demi,
    fontSize: 20,
    lineHeight: 28,
    color: fontColor.regular,
  },
  h3m: {
    marginTop: 0,
    marginBottom: 28,
  },
  h4: {
    fontFamily: fontFamily.demi,
    fontSize: 18,
    lineHeight: 25,
    color: fontColor.regular,
  },
  h4m: {
    marginTop: 0,
    marginBottom: 3,
  },
  inverse: {
    color: color.bright.main,
  },
})
