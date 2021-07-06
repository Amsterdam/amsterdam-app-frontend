import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, fontFamily} from '../../tokens'

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
    color: color.primary.main,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
})
