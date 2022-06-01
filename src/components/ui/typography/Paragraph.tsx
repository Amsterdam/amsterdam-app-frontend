import React, {ReactNode} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {font} from '../../../tokens'

type Props = {
  children: ReactNode
} & Omit<TextProps, 'style'>

export const Paragraph = ({children, ...otherProps}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  )
}

const createStyles = ({color, text}: Theme) =>
  StyleSheet.create({
    text: {
      color: color.text.default,
      fontFamily: font.weight.regular,
      fontSize: text.fontSize.body,
      lineHeight: text.lineHeight.body * text.fontSize.body,
    },
  })
