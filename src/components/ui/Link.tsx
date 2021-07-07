import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  text: string
  onPress: () => void
}

export const Link = ({text, onPress}: Props) => (
  <Text style={[font.p1, styles.link]} onPress={onPress}>
    {text}
  </Text>
)

const styles = StyleSheet.create({
  link: {
    color: color.primary.main,
    textDecorationLine: 'underline',
  },
})
