import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {color, fontFamily} from '../../tokens'

type TitleProps = {
  level?: 1 | 2 | 3 | 4
  inverse?: Boolean
  prose?: Boolean
  text: string
}

export const Title = ({level = 1, inverse, prose, text}: TitleProps) => {
  const fontSize = [24, 20, 20, 18]
  const lineHeight = [30, 28, 28, 25]
  const marginVertical = [20, 15, 10, 5]

  const styles = StyleSheet.create({
    inverse: {
      color: color.bright.main,
    },
    prose: {
      marginVertical: marginVertical[level - 1],
    },
    title: {
      fontFamily: fontFamily.demi,
      fontSize: fontSize[level - 1],
      lineHeight: lineHeight[level - 1],
      color: '#000000',
      fontWeight: '700',
    },
  })

  return (
    <Text
      style={[styles.title, prose && styles.prose, inverse && styles.inverse]}>
      {text}
    </Text>
  )
}
