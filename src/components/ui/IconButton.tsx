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
    backgroundColor: color.primary.main,
    borderRadius: 30,
    height: 60,
    marginBottom: 8,
    padding: 15,
    width: 60,
  },
  iconButton: {
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: 90,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: color.primary.main,
    textAlign: 'center',
    marginHorizontal: -10, // Allow label to overlay iconButton padding
  },
})
