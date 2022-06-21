import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {PressableProps, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {Pressable} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'
import {selectTheme} from '@/themes/themeSlice'

export const AddButton = (props: PressableProps) => {
  const styles = useThemable(createStyles)

  const {
    theme: {color},
  } = useSelector(selectTheme)

  return (
    <Pressable style={styles.button} {...props}>
      <Icon size={24}>
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
