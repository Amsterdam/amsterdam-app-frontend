import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  emphasis?: Boolean // Bold black text instead of regular blue
  onPress: () => void
  text: string
}

export const Link = ({emphasis, onPress, text}: Props) => (
  <Text
    style={[styles.link, emphasis ? styles.emphasis : styles.notEmphasis]}
    onPress={onPress}>
    {text}
  </Text>
)

const styles = StyleSheet.create({
  emphasis: {
    color: color.font.regular,
    fontFamily: font.weight.demi,
  },
  link: {
    fontSize: font.size.p1,
    lineHeight: font.height.p1,
  },
  notEmphasis: {
    fontFamily: font.weight.regular,
    color: color.touchable.primary,
    textDecorationLine: 'underline',
  },
})
