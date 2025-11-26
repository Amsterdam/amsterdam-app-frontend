import {ReactNode} from 'react'
import {
  AccessibilityProps,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from 'react-native'
import {FormField} from '@/components/ui/forms/FormField'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {
  type LogProps,
  PiwikAction,
  PiwikDimension,
} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onValueChange: (checked: boolean) => void
  value: boolean
} & TestProps &
  Pick<AccessibilityProps, 'accessibilityLabel'> &
  LogProps

export const Checkbox = ({
  accessibilityLabel,
  label,
  labelPosition = 'end',
  logAction = PiwikAction.toggle,
  logDimensions = {},
  onValueChange,
  testID,
  value,
  ...props
}: Props) => {
  const styles = useThemable(createStyles)
  const touchableProps = useThemable(createTouchableProps)

  const onPress = usePiwikTrackCustomEventFromProps({
    ...props,
    logAction,
    logDimensions: {
      ...logDimensions,
      // new state is the inverse of value
      [PiwikDimension.newState]: value ? 'unchecked' : 'checked',
    },
    onEvent: () => onValueChange(!value),
    testID,
  })

  return (
    <TouchableHighlight
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage="nl-NL"
      accessibilityRole="checkbox"
      accessibilityState={{selected: value}}
      onPress={onPress}
      testID={testID}
      {...touchableProps}>
      <FormField
        label={<Phrase>{label}</Phrase>}
        labelPosition={labelPosition}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {!!value && (
            <Icon
              color="inverse"
              name="check-mark"
              testID={`${testID}Icon`}
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
  underlayColor: color.checkbox.underlay,
})
