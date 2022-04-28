import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {TitleTokensPerLevel} from '../../../themes/tokens'
import {color, font} from '../../../tokens'

type Props = {
  level: keyof TitleTokensPerLevel
  text: string
}

export const Title = ({level, text}: Props) => {
  const styles = useThemable(createStyles(level))

  return (
    <Text accessibilityRole="header" style={styles.title}>
      {text}
    </Text>
  )
}

const createStyles = (level: keyof TitleTokensPerLevel) => (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: color.font.regular,
      fontFamily: font.weight.demi,
      fontSize: theme.text.fontSize[level],
      lineHeight: theme.text.lineHeight[level] * theme.text.fontSize[level],
    },
  })
