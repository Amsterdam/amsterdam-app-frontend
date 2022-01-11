import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import React, {ReactElement} from 'react'
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
  label: ReactElement
  onValueChange: () => void
  value: Boolean
} & Pick<AccessibilityProps, 'accessibilityLabel'>

export const Checkbox = ({
  accessibilityLabel,
  label,
  onValueChange,
  value,
}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={color.background.white}
      onPress={onValueChange}
      accessibilityLabel={accessibilityLabel}>
      <Row align="between" valign="center" gutter="md">
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
