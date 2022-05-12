import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {ComponentProps, ElementType} from 'react'

import {StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {color, size} from '../../tokens'

type Props<T extends ElementType> = ComponentProps<T>

export const AddButton = <T extends ElementType>(props: Props<T>) => (
  <TouchableOpacity accessibilityRole="button" style={styles.button} {...props}>
    <Enlarge style={styles.icon} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    padding: size.spacing.md,
    alignItems: 'center',
    borderColor: color.border.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    fill: color.font.primary,
  },
})
