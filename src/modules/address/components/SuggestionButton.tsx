import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {useSelector} from 'react-redux'
import {Text} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {selectTheme, Theme, useThemable} from '@/themes'

type Props = {
  label: string
} & TouchableOpacityProps

export const SuggestionButton = ({label, onPress}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)
  const styles = useThemable(createStyles)

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={styles.button}>
      <Row gutter="xs">
        <Icon size={24}>
          <Location fill={color.text.tertiary} />
        </Icon>
        <Text large>{label}</Text>
      </Row>
    </TouchableOpacity>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      paddingVertical: size.spacing.md,
    },
  })
