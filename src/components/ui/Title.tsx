import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {fontFamily} from '../../tokens'

export type TitleProps = {
  level?: 1 | 2 | 3 | 4
  text: string
}

export function Title({level = 1, text}: TitleProps) {
  const fontSize = [24, 20, 20, 18]
  const lineHeight = [30, 28, 28, 25]

  const styles = StyleSheet.create({
    title: {
      fontFamily: fontFamily.demi,
      fontSize: fontSize[level - 1],
      lineHeight: lineHeight[level - 1],
      color: '#000000',
      fontWeight: '700',
    },
  })

  return <Text style={styles.title}>{text}</Text>
}
