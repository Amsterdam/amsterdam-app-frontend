import React from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import fontSize from '../../tokens/fontSize'
import fontFamily from '../../tokens/fontFamily'

type Props = {
  children: React.ReactNode
  variant?: 'default' | 'buttonPrimary'
} & TextProps

type PropsWithoutStyle = Omit<Props, 'style'>

const Text = ({
  children,
  variant = 'default',
  ...otherProps
}: PropsWithoutStyle) => {
  return (
    <TextRN style={[styles.default, styles[variant]]} {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  buttonPrimary: {
    fontFamily: fontFamily.demiBold,
    color: 'white',
  },
})

export default Text
