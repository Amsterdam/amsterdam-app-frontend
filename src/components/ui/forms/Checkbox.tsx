import React, {ReactNode} from 'react'
import {
  AccessibilityProps,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native'
import {FormField} from '@/components/ui/forms'
import {MainAxisPosition} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Theme, useThemable} from '@/themes'

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
  const styles = useThemable(createStyles)
  const touchableProps = useThemable(createTouchableProps)

  return (
    <TouchableHighlight
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{selected: value}}
      onPress={onValueChange}
      {...touchableProps}>
      <FormField {...{label, labelPosition}}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {!!value && <Icon color="inverse" name="checkmark" size={24} />}
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
      borderWidth: 2,
      borderColor: color.control.checked.background,
      backgroundColor: color.control.default.background,
    },
    checked: {
      backgroundColor: color.control.checked.background,
    },
  })

const createTouchableProps = ({color}: Theme): TouchableHighlightProps => ({
  underlayColor: color.box.background.white,
})
