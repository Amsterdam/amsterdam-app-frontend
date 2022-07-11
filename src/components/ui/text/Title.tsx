import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {TitleTokensPerLevel} from '@/themes/tokens'

type Props = {
  color?: 'default' | 'inverse' | 'link'
  level?: keyof TitleTokensPerLevel
  text: string
} & Omit<TextProps, 'style'>

export const Title = ({
  color = 'default',
  level = 'h1',
  text,
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, level}),
    [color, level],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text accessibilityRole="header" style={styles.title} {...otherProps}>
      {text}
    </Text>
  )
}

// TODO Transition text color
const createStyles =
  ({color: textColor, level}: Required<Pick<Props, 'color' | 'level'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontWeight.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
