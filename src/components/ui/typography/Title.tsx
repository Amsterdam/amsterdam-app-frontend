import {Theme, useThemable} from '_themes/index'
import {TitleTokensPerLevel} from '_themes/tokens'
import {font} from '_tokens/index'
import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'

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
        fontFamily: font.weight.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
