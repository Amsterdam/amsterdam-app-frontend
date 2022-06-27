import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {TitleTokensPerLevel} from '@/themes/tokens'

type Props = {
  label: string
  level: keyof TitleTokensPerLevel
}

export const Link = ({label, level}: Props) => {
  const styles = useThemable(createStyles({level}))

  return <Text style={styles.text}>{label}</Text>
}

const createStyles =
  ({level}: Pick<Props, 'level'>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.pressable.navigation,
        fontFamily: text.fontWeight.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight.h5 * text.fontSize.h5,
      },
    })
