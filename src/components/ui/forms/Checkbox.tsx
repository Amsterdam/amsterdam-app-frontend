import {ReactNode} from 'react'
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
import {TestProps} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onValueChange: () => void
  value: boolean
} & Required<TestProps> &
  Pick<AccessibilityProps, 'accessibilityLabel'>

export const Checkbox = ({
  accessibilityLabel,
  label,
  labelPosition = 'end',
  onValueChange,
  testID,
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
      testID={testID}
      {...touchableProps}>
      <FormField
        label={label}
        labelPosition={labelPosition}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {!!value && (
            <Icon
              color="inverse"
              name="checkmark"
            />
          )}
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
      padding: 2,
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
