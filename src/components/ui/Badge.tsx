import React from 'react'
import {AccessibilityProps, StyleSheet, Text, View} from 'react-native'
import {Row} from '@/components/ui/layout'
import {Theme, useThemable} from '@/themes'
import {formatNumber} from '@/utils/formatNumber'

export type BadgeProps = {
  value: number | string
} & Pick<AccessibilityProps, 'accessible'>

const config = {
  size: 20, // Width and height of the circle
  fontSize: 12, // Text size of the value
  inset: 2, // Horizontal padding
  alignmentOffset: 1, // Adjusts vertical alignment – glyphs are not centered in the font’s line height
}

export const Badge = ({accessible, value}: BadgeProps) => {
  const styles = useThemable(createStyles(config))

  return (
    <Row align="start">
      <View style={styles.circle}>
        <Text
          accessible={accessible}
          allowFontScaling={false}
          numberOfLines={1}
          style={styles.text}>
          {typeof value === 'number' ? formatNumber(value) : value}
        </Text>
      </View>
    </Row>
  )
}

const createStyles =
  ({size, fontSize, inset, alignmentOffset}: typeof config) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      circle: {
        borderRadius: size / 2,
        backgroundColor: color.pressable.secondary.background,
      },
      text: {
        minWidth: size, // Make sure we have at least a circle
        marginTop: alignmentOffset, // See comment above
        paddingHorizontal: inset, // Use padding for horizontal inset
        textAlign: 'center',
        fontFamily: text.fontWeight.bold,
        fontSize: fontSize,
        lineHeight: size - alignmentOffset, // Use line height for vertical inset to prevent cut-off glyphs
        color: color.text.inverse,
      },
    })
