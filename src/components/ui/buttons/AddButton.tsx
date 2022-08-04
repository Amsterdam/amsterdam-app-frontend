import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {PressableProps, StyleSheet} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable, useTheme} from '@/themes'

export const AddButton = (props: PressableProps) => {
  const {color} = useTheme()
  const styles = useThemable(createStyles)

  return (
    <Pressable style={styles.button} {...props}>
      <Icon scalesWithFont={false} size={24}>
        <Enlarge fill={color.pressable.default.background} />
      </Icon>
    </Pressable>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    button: {
      padding: size.spacing.md,
      alignItems: 'center',
      borderColor: color.border.primary,
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  })
