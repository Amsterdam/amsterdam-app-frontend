import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {font} from '../../../tokens'
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
        color: color.pressable.navigation,
        fontSize: text.fontSize[level],
        fontFamily: font.weight.bold,
        lineHeight: text.lineHeight.h5 * text.fontSize.h5,
      },
    })
