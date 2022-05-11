import React, {useMemo} from 'react'
import {StyleSheet, Text} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {TitleTokensPerLevel} from '../../../themes/tokens'
import {font} from '../../../tokens'

type ProminenceLevel = 1 | 2 | 3

type Props = {
  level: keyof TitleTokensPerLevel
  prominence?: ProminenceLevel
  text: string
}

export const Title = ({level, prominence = 1, text}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({level, prominence}),
    [level, prominence],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text accessibilityRole="header" style={styles.title}>
      {text}
    </Text>
  )
}

// TODO Transition text color
const createStyles =
  ({level, prominence}: Required<Pick<Props, 'level' | 'prominence'>>) =>
  (theme: Theme) => {
    const prominenceColors: Record<ProminenceLevel, string> = {
      1: theme.color.text.default,
      2: theme.color.text.secondary,
      3: theme.color.text.tertiary,
    }

    return StyleSheet.create({
      title: {
        color: prominenceColors[prominence],
        fontFamily: font.weight.demi,
        fontSize: theme.text.fontSize[level],
        lineHeight: theme.text.lineHeight[level] * theme.text.fontSize[level],
      },
    })
  }
