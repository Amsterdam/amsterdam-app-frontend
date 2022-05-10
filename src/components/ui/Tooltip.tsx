import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../themes'
import {Text} from './Text'

type Props = {
  text: string
}

export const Tooltip = ({text}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.tooltip}>
      <Text inverse>{text}</Text>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tooltip: {
      padding: theme.size.spacing.md,
      backgroundColor: theme.color.background.inverted,
    },
  })
