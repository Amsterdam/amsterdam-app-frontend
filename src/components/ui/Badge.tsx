import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {color, font} from '../../tokens'
import {formatNumber} from '../../utils/formatNumber'
import {Row} from './layout'

export type BadgeProps = {
  value: number | string
}

const size = 20 // Width and height of the circle
const fontSize = 12 // Text size of the value
const inset = 2 // Horizontal padding
const alignmentOffset = 1 // Adjusts vertical alignment – glyphs are not centered in the font’s line height

export const Badge = ({value}: BadgeProps) => (
  <Row align="start">
    <View style={styles.circle}>
      <Text allowFontScaling={false} numberOfLines={1} style={styles.text}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </Text>
    </View>
  </Row>
)

const styles = StyleSheet.create({
  circle: {
    borderRadius: size / 2,
    backgroundColor: color.touchable.secondary,
  },
  text: {
    minWidth: size, // Make sure we have at least a circle
    marginTop: alignmentOffset, // See comment above
    paddingHorizontal: inset, // Use padding for horizontal inset
    textAlign: 'center',
    fontFamily: font.weight.demi,
    fontSize: fontSize,
    lineHeight: size - alignmentOffset, // Use line height for vertical inset to prevent cut-off glyphs
    color: color.font.inverse,
  },
})
