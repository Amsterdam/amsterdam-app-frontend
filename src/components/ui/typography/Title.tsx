import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {TitleTokensPerLevel} from '@/themes/tokens'

type Props = {
  level?: keyof TitleTokensPerLevel
  text: string
} & Omit<TextProps, 'style'>

export const Title = ({level = 'h1', text}: Props) => {
  const createdStyles = useMemo(() => createStyles({level}), [level])
  const styles = useThemable(createdStyles)

  return (
    <Text accessibilityRole="header" style={styles.title}>
      {text}
    </Text>
  )
}

// TODO Transition text color
const createStyles =
  ({level}: Required<Pick<Props, 'level'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        color: color.text.default,
        fontFamily: text.fontWeight.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
