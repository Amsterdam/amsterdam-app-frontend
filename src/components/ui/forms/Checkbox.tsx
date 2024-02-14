import {ReactNode, useCallback} from 'react'
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
import {TestProps} from '@/components/ui/types'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  label: ReactNode
  labelPosition?: MainAxisPosition
  onValueChange: () => void
  value: boolean
} & Required<TestProps> &
  Pick<AccessibilityProps, 'accessibilityLabel'> &
  Partial<LogProps>

export const Checkbox = ({
  accessibilityLabel,
  label,
  labelPosition = 'end',
  onValueChange,
  testID,
  value,
  logAction = PiwikAction.toggle,
  logDimensions = {},
  logCategory,
  logValue,
  ...props
}: Props) => {
  const styles = useThemable(createStyles)
  const touchableProps = useThemable(createTouchableProps)
  const {trackCustomEvent} = usePiwik()

  const onPress = useCallback(() => {
    onValueChange?.()
    const logName = getLogNameFromProps({testID, ...props})

    if (logName) {
      trackCustomEvent(
        `${logName}`,
        logAction,
        {
          ...logDimensions,
          // new state is the inverse of value
          [PiwikDimension.newState]: value ? 'unchecked' : 'checked',
        },
        logCategory,
        logValue,
      )
    }
  }, [
    logAction,
    logCategory,
    logDimensions,
    logValue,
    onValueChange,
    props,
    testID,
    trackCustomEvent,
    value,
  ])

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
