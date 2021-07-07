import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  text: string
  onPress: () => void
}

export const Link = ({text, onPress}: Props) => {
  const fontStyles = {...font.p1, marginTop: undefined, marginBottom: undefined}

  return (
    <Text style={[fontStyles, styles.link]} onPress={onPress}>
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  link: {
    color: color.primary.main,
    textDecorationLine: 'underline',
  },
})
