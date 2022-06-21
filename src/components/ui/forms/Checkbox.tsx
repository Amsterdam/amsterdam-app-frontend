import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import React, {ReactNode} from 'react'
import {
  AccessibilityProps,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {useSelector} from 'react-redux'
import {FormField} from '@/components/ui/forms'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {selectTheme, Theme, useThemable} from '@/themes'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onValueChange: () => void
  value: boolean
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const Checkbox = ({
  accessibilityLabel,
  label,
  labelPosition = 'end',
  onValueChange,
  value,
}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)
  const styles = useThemable(createStyles)

  return (
    <TouchableHighlight
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{selected: value}}
      onPress={onValueChange}
      underlayColor={color.box.background.white}>
      <FormField {...{label, labelPosition}}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {value && <Checkmark fill={color.text.inverse} />}
        </View>
      </FormField>
    </TouchableHighlight>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    checkbox: {
      width: 24,
      aspectRatio: 1,
      padding: 4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: color.control.default.border,
      backgroundColor: color.control.default.background,
    },
    checked: {
      backgroundColor: color.control.checked.background,
      borderColor: color.control.checked.background,
    },
  })
