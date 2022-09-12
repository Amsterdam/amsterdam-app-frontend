import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import React, {ReactNode, SVGProps} from 'react'
import {
  AccessibilityProps,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native'
import {FormField} from '@/components/ui/forms'
import {MainAxisPosition} from '@/components/ui/layout'
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
  const iconProps = useThemable(createIconProps)
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
          {!!value && <Checkmark {...iconProps} />}
        </View>
      </FormField>
    </TouchableHighlight>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.inverse,
})

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
