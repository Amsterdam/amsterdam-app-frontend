import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
  TextStyle,
} from 'react-native'
import {fontFamily} from '../../tokens'

type Props = {
  emphasis?: Boolean
  children: React.ReactNode
  variant?: 'default' | 'inverse'
} & Omit<TextRNProps, 'style'>

const Text = ({
  children,
  emphasis,
  variant = 'default',
  ...otherProps
}: Props) => {
  const style: StyleProp<TextStyle> = emphasis
    ? {fontFamily: fontFamily.demi}
    : undefined

  return (
    <TextRN style={[styles.default, styles[variant], style]} {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  inverse: {
    fontFamily: fontFamily.demi,
    color: 'white',
  },
})

export default Text
