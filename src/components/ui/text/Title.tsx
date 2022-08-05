import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {FontWeights, TitleTokensPerLevel} from '@/themes/tokens'

type Props = {
  color?: 'default' | 'inverse' | 'link'
  level?: keyof TitleTokensPerLevel
  text: string
  weight?: keyof FontWeights
} & Omit<TextProps, 'style'>

export const Title = ({
  color = 'default',
  level = 'h1',
  text,
  weight = 'bold',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, level, weight}),
    [color, level, weight],
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
  ({
    color: textColor,
    level,
    weight,
  }: Required<Pick<Props, 'color' | 'level' | 'weight'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontWeight[weight],
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
