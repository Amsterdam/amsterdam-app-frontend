import React, {ReactNode} from 'react'
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  children: ReactNode
  intro?: boolean
  inverse?: boolean
  large?: boolean
  link?: boolean
  margin?: boolean
  primary?: boolean
  secondary?: boolean
  small?: boolean
  touchable?: boolean
  warning?: boolean
} & Omit<TextRNProps, 'style'>

export const Text = ({
  children,
  intro,
  inverse,
  large,
  link,
  margin,
  primary,
  secondary,
  small,
  touchable,
  warning,
  ...otherProps
}: Props) => {
  return (
    <TextRN
      accessibilityRole={warning ? 'alert' : 'text'}
      android_hyphenationFrequency="normal"
      style={[
        styles.text,
        margin && styles.margin,
        intro && styles.intro,
        inverse && styles.inverse,
        large && styles.large,
        large && margin && styles.marginLarge,
        link && styles.link,
        primary && styles.primary,
        secondary && styles.secondary,
        small && styles.small,
        small && margin && styles.marginSmall,
        touchable && styles.touchable,
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
  large: {
    fontSize: font.size.l1,
    lineHeight: font.height.l1,
  },
  link: {
    color: color.touchable.primary,
    textDecorationLine: 'underline',
  },
  margin: {
    marginBottom: font.leadingBottom.p1,
    marginTop: font.leadingTop.p1,
  },
  marginLarge: {
    marginBottom: font.leadingBottom.l1,
    marginTop: font.leadingTop.l1,
  },
  marginSmall: {
    marginBottom: font.leadingBottom.t1,
    marginTop: font.leadingTop.t1,
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
    flexShrink: 1,
  },
  touchable: {
    color: color.touchable.pressed,
  },
  warning: {
    color: color.font.invalid,
    fontFamily: font.weight.demi,
  },
})
