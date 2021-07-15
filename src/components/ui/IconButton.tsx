import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {color, font, spacing} from '../../tokens'

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
    borderRadius: spacing.xxl / 2,
    height: spacing.xxl,
    marginBottom: spacing.sm,
    padding: spacing.md,
    width: spacing.xxl,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    maxWidth: spacing.xxl + 2 * spacing.md,
  },
  label: {
    fontFamily: font.weight.regular,
    fontSize: font.size.t1,
    lineHeight: font.height.t1,
    color: color.touchable.primary,
    textAlign: 'center',
    marginHorizontal: -spacing.sm, // Allow label to overlay iconButton padding
  },
})
