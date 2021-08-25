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
  link?: Boolean
  margin?: Boolean
  secondary?: Boolean
  small?: Boolean
  warning?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({
  children,
  inverse,
  margin,
  secondary,
  small,
  link,
  warning,
  ...otherProps
}: Props) => {
  return (
    <TextRN
      style={[
        styles.text,
        margin && styles.margin,
        inverse && styles.inverse,
        link && styles.link,
        secondary && styles.secondary,
        small && styles.small,
        warning && styles.warning,
      ]}
      {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  inverse: {
    color: color.font.inverse,
    fontFamily: font.weight.demi,
  },
  link: {
    color: color.touchable.primary,
    textDecorationLine: 'underline',
  },
  margin: {
    marginBottom: font.leadingBottom.p1,
    marginTop: font.leadingTop.p1,
  },
  secondary: {
    color: color.font.secondary,
  },
  small: {
    fontSize: font.size.t1,
  },
  text: {
    fontFamily: font.weight.regular,
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
    color: color.font.regular,
  },
  warning: {
    color: color.font.warning,
  },
})
