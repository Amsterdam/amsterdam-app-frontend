import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {color, fontFamily} from '../../tokens'

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
    width: 58,
    height: 58,
    marginBottom: 8,
    padding: 16,
    backgroundColor: color.primary.main,
    borderRadius: 29,
  },
  iconButton: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: color.primary.main,
    textAlign: 'center',
    marginHorizontal: -10, // Allow label to overlay iconButton padding
  },
})
