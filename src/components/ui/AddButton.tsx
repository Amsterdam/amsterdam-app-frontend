import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'

import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {color, size} from '../../tokens'

export const AddButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
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
    borderColor: color.border.default,
    borderStyle: 'dashed',
    borderWidth: 1,
    width: 165,
    height: 74,
  },
  icon: {
    width: 24,
    height: 24,
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
