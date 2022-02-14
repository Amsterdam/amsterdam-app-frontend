import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {color, size} from '../../../tokens'
import {Text} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  label: string
} & TouchableOpacityProps

export const SuggestionButton = ({label, onPress}: Props) => (
  <TouchableOpacity
    accessibilityRole="button"
    onPress={onPress}
    style={styles.button}>
    <Row gutter="xs">
      <Location width={24} height={24} fill={color.font.tertiary} />
      <Text large>{label}</Text>
    </Row>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: size.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: color.border.divider,
    borderStyle: 'solid',
  },
})
