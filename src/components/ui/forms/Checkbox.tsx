import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import React, {ReactNode} from 'react'
import {
  AccessibilityProps,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {color} from '../../../tokens'
import {SkipInScreenReader} from '../SkipInScreenReader'
import {Row, Stretch} from '../layout'

type Props = {
  label: ReactNode
  onValueChange: () => void
  value: boolean
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const Checkbox = ({
  accessibilityLabel,
  label,
  onValueChange,
  value,
}: Props) => {
  return (
    <TouchableHighlight
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{selected: value}}
      onPress={onValueChange}
      underlayColor={color.background.white}>
      <Row align="between" gutter="md" valign="center">
        <View style={[styles.checkbox, value && styles.checked]}>
          {value && <Checkmark fill={color.font.inverse} />}
        </View>
        <Stretch>
          <SkipInScreenReader>{label}</SkipInScreenReader>
        </Stretch>
      </Row>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    padding: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.control.default.border,
    backgroundColor: color.control.default.background,
    flex: 0,
  },
  checked: {
    backgroundColor: color.control.checked.background,
    borderColor: color.control.checked.background,
  },
})
