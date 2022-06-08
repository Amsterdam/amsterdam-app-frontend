import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {ComponentProps, ElementType} from 'react'

import {StyleSheet, TouchableHighlight} from 'react-native'
import {useSelector} from 'react-redux'
import {selectTheme} from '../../themes/themeSlice'
import {color, size} from '../../tokens'
import {Icon} from './media'

type Props<T extends ElementType> = ComponentProps<T>

export const AddButton = <T extends ElementType>(props: Props<T>) => {
  const {theme} = useSelector(selectTheme)

  return (
    <TouchableHighlight
      accessibilityRole="button"
      style={styles.button}
      underlayColor={theme.color.pressable.pressed.background}
      {...props}>
      <Icon size={24}>
        <Enlarge fill={color.font.primary} />
      </Icon>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: size.spacing.md,
    alignItems: 'center',
    borderColor: color.border.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
})
