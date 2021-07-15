import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {color, font, size} from '../../tokens'

type Props = {
  icon: React.ComponentElement<any, any>
  label: string
  onPress: () => void
}

export const IconButton = ({icon, label, onPress}: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.iconButton}>
    {icon && <View style={styles.circle}>{icon}</View>}
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  circle: {
    backgroundColor: color.touchable.primary,
    borderRadius: size.spacing.xxl / 2,
    height: size.spacing.xxl,
    marginBottom: size.spacing.sm,
    padding: size.spacing.md,
    width: size.spacing.xxl,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: size.spacing.md,
    maxWidth: size.spacing.xxl + 2 * size.spacing.md,
  },
  label: {
    fontFamily: font.weight.regular,
    fontSize: font.size.t1,
    lineHeight: font.height.t1,
    color: color.touchable.primary,
    textAlign: 'center',
    marginHorizontal: -size.spacing.sm, // Allow label to overlay iconButton padding
  },
})
