import React from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  children: React.ReactNode
  intro?: Boolean
  inverse?: Boolean
  link?: Boolean
  margin?: Boolean
  primary?: boolean
  secondary?: Boolean
  small?: Boolean
  warning?: Boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({
  children,
  intro,
  inverse,
  link,
  margin,
  primary,
  secondary,
  small,
  warning,
  ...otherProps
}: Props) => {
  return (
    <TextRN
      accessibilityRole={warning ? 'alert' : 'text'}
      selectable
      style={[
        styles.text,
        margin && styles.margin,
        intro && styles.intro,
        inverse && styles.inverse,
        link && styles.link,
        primary && styles.primary,
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
  intro: {
    fontFamily: font.weight.demi,
  },
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
  primary: {
    color: color.font.primary,
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
    color: color.font.invalid,
    fontFamily: font.weight.demi,
  },
})
