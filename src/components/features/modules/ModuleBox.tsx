import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {baseColor} from '../../../tokens'

type Props = {
  children: ReactNode
  selected: boolean
}

export const ModuleBox = ({children, selected}: Props) => {
  const styles = useThemable(createStyles({selected}))

  return <View style={styles.container}>{children}</View>
}

// TODO Transition background and border colors
const createStyles =
  ({selected}: Partial<Props>) =>
  (theme: Theme) => {
    const borderWidth = 1
    const backgroundColor = selected ? theme.color.background.white : undefined

    return StyleSheet.create({
      container: {
        padding: theme.size.spacing.md - borderWidth,
        backgroundColor,
        borderWidth,
        borderStyle: 'dashed',
        borderColor: selected ? backgroundColor : baseColor.neutral.grey5,
      },
    })
  }
