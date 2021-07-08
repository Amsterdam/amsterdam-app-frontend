import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {color, fontFamily} from '../../tokens'

type Props = {
  icon: 'info'
  label: string
}

export const IconButton = ({icon, label}: Props) => (
  <View>
    <View style={styles.circle}>
      {icon === 'info' && <Info fill={color.tint.level1} />}
    </View>
    <Text style={styles.label}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  circle: {
    width: 64,
    height: 64,
    marginBottom: 8,
    padding: 16,
    backgroundColor: color.primary.main,
    borderRadius: 50,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: color.primary.main,
  },
})
