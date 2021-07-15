import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  text: string
  onPress: () => void
}

export const Link = ({text, onPress}: Props) => (
  <Text style={styles.link} onPress={onPress}>
    {text}
  </Text>
)

const styles = StyleSheet.create({
  link: {
    fontFamily: font.fontFamily.regular,
    fontSize: font.fontSize.p1,
    lineHeight: font.lineHeight.p1,
    color: color.primary.main,
    textDecorationLine: 'underline',
  },
})
