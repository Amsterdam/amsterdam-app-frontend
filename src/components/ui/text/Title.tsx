import React, {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {TitleTokensPerLevel} from '@/themes/tokens'

type Props = {
  inPressable?: boolean
  level?: keyof TitleTokensPerLevel
  text: string
} & Omit<TextProps, 'style'>

export const Title = ({
  inPressable = false,
  level = 'h1',
  text,
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({inPressable, level}),
    [inPressable, level],
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
  ({inPressable, level}: Required<Pick<Props, 'inPressable' | 'level'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: inPressable ? color.pressable.navigation : color.text.default,
        fontFamily: text.fontWeight.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
