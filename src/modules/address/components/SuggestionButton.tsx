import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {Text} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {color, size} from '@/tokens'

type Props = {
  label: string
} & TouchableOpacityProps

export const SuggestionButton = ({label, onPress}: Props) => (
  <TouchableOpacity
    accessibilityRole="button"
    onPress={onPress}
    style={styles.button}>
    <Row gutter="xs">
      <Icon size={24}>
        <Location fill={color.font.tertiary} />
      </Icon>
      <Text large>{label}</Text>
    </Row>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: size.spacing.md,
  },
})
