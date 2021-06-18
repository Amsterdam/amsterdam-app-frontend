import React from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'

const Text = ({
  children,
  style,
  ...otherProps
}: {
  children: React.ReactNode
} & TextProps) => {
  return (
    <TextRN style={[styles.text, style]} {...otherProps}>
      {children}
    </TextRN>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 20,
  },
})

export default Text
