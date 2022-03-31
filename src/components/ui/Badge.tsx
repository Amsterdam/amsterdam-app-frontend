import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {color, font} from '../../tokens'

type Props = {
  value: number | string
}

const size = 20 // Width and height of the circle
const fontSize = 12 // Text size of the value
const inset = 6 // Horizontal padding
const alignmentOffset = 1 // Adjusts vertical alignment – glyphs are not centered in the font’s line height

export const Badge = ({value}: Props) => (
  <View style={styles.badge}>
    <Text allowFontScaling={false} numberOfLines={1} style={styles.text}>
      {value}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start', // Simulate inline layout - NOTE assumes a flex direction of ‘row’
    borderRadius: size / 2,
    backgroundColor: color.touchable.secondary,
  },
  text: {
    minWidth: size, // Make sure we have at least a circle
    marginTop: alignmentOffset, // See above
    paddingHorizontal: inset, // Use padding for horizontal inset
    textAlign: 'center',
    fontFamily: font.weight.demi,
    fontSize: fontSize,
    lineHeight: size - alignmentOffset, // Use line height for vertical inset to prevent cut-off glyphs
    color: color.font.inverse,
  },
})
