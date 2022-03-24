import React, {ReactNode, useContext} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {DeviceContext} from '../../providers'
import {color, font} from '../../tokens'
import {Row} from './layout'

type Props = {
  icon: ReactNode
  label: string
}

export const Trait = ({icon, label}: Props) => {
  const device = useContext(DeviceContext)
  const iconSize = font.size.t1 * device.fontScale

  return (
    <Row>
      <View style={[styles.icon, {width: iconSize}]}>{icon}</View>
      <Text style={styles.text}>{label}</Text>
    </Row>
  )
}

const styles = StyleSheet.create({
  icon: {
    aspectRatio: 1,
  },
  text: {
    fontFamily: font.weight.regular,
    fontSize: font.size.t1,
    lineHeight: font.height.t1,
    color: color.font.primary,
  },
})
