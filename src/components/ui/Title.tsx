import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, font, fontMargin} from '../../tokens'

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
    font: [font.h1, font.h2, font.h3, font.h4][level - 1],
    margin: [fontMargin.h1, fontMargin.h2, fontMargin.h3, fontMargin.h4][
      level - 1
    ],
  })

  return (
    <Text
      style={[styles.font, prose && styles.margin, inverse && styles.inverse]}>
      {text}
    </Text>
  )
}
