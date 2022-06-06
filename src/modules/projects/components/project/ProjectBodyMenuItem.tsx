import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {color, font, size} from '../../../../tokens'

type Props = {
  label: string
  onPress: () => void
}

export const ProjectBodyMenuItem = ({label, onPress}: Props) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  label: {
    fontFamily: font.weight.regular,
    fontSize: font.size.t1,
    lineHeight: font.height.t1,
    color: color.touchable.primary,
    textAlign: 'center',
    marginHorizontal: -size.spacing.sm, // Allow label to overlay iconButton padding
  },
})
