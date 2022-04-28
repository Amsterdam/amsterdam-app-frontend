import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, TitleTokensPerLevel, useThemedStyles} from '../../../themes'
import {color, font} from '../../../tokens'

type Props = {
  level: keyof TitleTokensPerLevel
  text: string
}

export const Title = ({level, text}: Props) => {
  const styles = useThemedStyles(createStyles(level))

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
      fontSize: theme.typography.fontSize[level],
      lineHeight:
        theme.typography.lineHeight[level] * theme.typography.fontSize[level],
    },
  })
