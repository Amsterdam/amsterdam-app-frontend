import React from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  level?: 1 | 2 | 3 | 4
  inverse?: Boolean
  margin?: Boolean
  primary?: Boolean
  subtitle?: Boolean
  text: string
  visuallyHidden?: Boolean
} & Omit<TextProps, 'style'>

export const Title = ({
  level = 1,
  inverse,
  margin,
  primary,
  subtitle,
  text,
  visuallyHidden,
}: Props) => {
  const fontStyles = [styles.h1, styles.h2, styles.h3, styles.h4][level - 1]
  const marginStyles = [styles.h1m, styles.h2m, styles.h3m, styles.h4m][
    level - 1
  ]

  return (
    <Text
      style={[
        fontStyles,
        inverse && styles.inverse,
        margin && marginStyles,
        primary && styles.primary,
        subtitle && styles.subtitle,
        visuallyHidden && styles.visuallyHidden,
      ]}
      accessibilityRole="header">
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  h1: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h1,
    lineHeight: font.height.h1,
  },
  h1m: {
    marginBottom: font.leadingBottom.h1,
    marginTop: font.leadingTop.h1,
  },
  h2: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h2,
    lineHeight: font.height.h2,
  },
  h2m: {
    marginBottom: font.leadingBottom.h2,
    marginTop: font.leadingTop.h2,
  },
  h3: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h3,
    lineHeight: font.height.h3,
  },
  h3m: {
    marginBottom: font.leadingBottom.h3,
    marginTop: font.leadingTop.h3,
  },
  h4: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
    fontSize: font.size.h4,
    lineHeight: font.height.h4,
  },
  h4m: {
    marginBottom: font.leadingBottom.h4,
    marginTop: font.leadingTop.h4,
  },
  inverse: {
    color: color.font.inverse,
  },
  primary: {
    color: color.font.primary,
  },
  subtitle: {
    fontFamily: font.weight.regular,
  },
  visuallyHidden: {
    height: 1,
    marginBottom: -1,
  },
})
