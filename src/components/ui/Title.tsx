import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  level?: 1 | 2 | 3 | 4
  inverse?: Boolean
  prose?: Boolean
  text: string
}

export const Title = ({level = 1, inverse, prose, text}: Props) => {
  const styles = StyleSheet.create({
    inverse: {
      color: color.bright.main,
    },
    title: [font.h1, font.h2, font.h3, font.h4][level - 1],
  })

  const fontStyles = prose
    ? styles.title
    : {...styles.title, marginTop: undefined, marginBottom: undefined}

  return <Text style={[fontStyles, inverse && styles.inverse]}>{text}</Text>
}
