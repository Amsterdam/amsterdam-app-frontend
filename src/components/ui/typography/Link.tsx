import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {font} from '../../../tokens'

type Props = {
  label: string
}

export const Link = ({label}: Props) => {
  const styles = useThemable(createStyles)
  return <Text style={styles.text}>{label}</Text>
}

const createStyles = ({color, text}: Theme) =>
  StyleSheet.create({
    text: {
      color: color.pressable.navigation,
      fontSize: text.fontSize.h5,
      fontFamily: font.weight.bold,
      lineHeight: text.lineHeight.h5 * text.fontSize.h5,
    },
  })
