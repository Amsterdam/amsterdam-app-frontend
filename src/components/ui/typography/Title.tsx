import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {TitleTokensPerLevel} from '../../../themes/tokens'
import {font} from '../../../tokens'

type Props = {
  level: keyof TitleTokensPerLevel
  text: string
} & Omit<TextProps, 'style'>

export const Title = ({level, text}: Props) => {
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
  (theme: Theme) =>
    StyleSheet.create({
      title: {
        color: theme.color.text.default,
        fontFamily: font.weight.bold,
        fontSize: theme.text.fontSize[level],
        lineHeight: theme.text.lineHeight[level] * theme.text.fontSize[level],
      },
    })
