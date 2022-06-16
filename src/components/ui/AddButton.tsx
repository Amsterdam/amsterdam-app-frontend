import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {ComponentProps, ElementType} from 'react'
import {StyleSheet, TouchableHighlight} from 'react-native'
import {useSelector} from 'react-redux'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'
import {selectTheme} from '@/themes/themeSlice'

type Props<T extends ElementType> = ComponentProps<T>

export const AddButton = <T extends ElementType>(props: Props<T>) => {
  const styles = useThemable(createStyles)

  const {
    theme: {color},
  } = useSelector(selectTheme)

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={styles.button}
      underlayColor={color.pressable.pressed.background}
      {...props}>
      <Icon size={24}>
        <Enlarge fill={color.pressable.default.background} />
      </Icon>
    </TouchableHighlight>
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
