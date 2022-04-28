import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React, {ComponentProps, ElementType} from 'react'

import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {color, size} from '../../tokens'

type Props<T extends ElementType> = ComponentProps<T>

export const AddButton = <T extends ElementType>(props: Props<T>) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.button}
      {...props}>
      <View style={styles.iconWrapper}>
        <Enlarge style={styles.icon} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size.addButton.width,
    height: size.addButton.height,
    borderColor: color.border.default,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    fill: color.font.primary,
  },
  iconWrapper: {
    borderColor: color.font.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 50,
    padding: size.spacing.sm,
  },
})
