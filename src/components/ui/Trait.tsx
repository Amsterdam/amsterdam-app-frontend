import React, {ReactNode} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {color, font} from '../../tokens'
import {Row} from './layout'

type Props = {
  icon: ReactNode
  label: string
}

export const Trait = ({icon, label}: Props) => (
  <Row gutter="xs">
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.text}>{label}</Text>
  </Row>
)

const styles = StyleSheet.create({
  icon: {
    width: font.size.t1,
    aspectRatio: 1,
  },
  text: {
    fontFamily: font.weight.regular,
    fontSize: font.size.t1,
    lineHeight: font.height.t1,
    color: color.font.primary,
  },
})
