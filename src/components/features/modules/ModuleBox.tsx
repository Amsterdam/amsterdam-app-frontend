import React, {ReactNode, useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {baseColor} from '../../../tokens'

type Props = {
  children: ReactNode
  expandedChildren: ReactNode
  selected: boolean
}

export const ModuleBox = ({children, expandedChildren, selected}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const styles = useThemable(createStyles({selected}))

  // TODO Transition expanded children appearance
  return (
    <Pressable onPress={() => setExpanded(!expanded)}>
      <View style={styles.container}>{children}</View>
      {expanded && expandedChildren}
    </Pressable>
  )
}

// TODO Transition background and border colors
const createStyles =
  ({selected}: Partial<Props>) =>
  (theme: Theme) => {
    const borderWidth = 1
    const backgroundColor = selected ? theme.color.background.cutout : undefined

    return StyleSheet.create({
      container: {
        padding: theme.size.spacing.md - borderWidth,
        backgroundColor,
        borderWidth,
        borderStyle: 'dashed',
        borderColor: selected ? backgroundColor : baseColor.primary.darkblue,
      },
    })
  }
