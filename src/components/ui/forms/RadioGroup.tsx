import {useCallback} from 'react'
import {Radio} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'
import {getLogNameFromProps} from '@/processes/piwik/utils/getLogNameFromProps'

export type RadioGroupOption<T> = {
  label: string
  value: T
}

type RadioGroupProps<T> = {
  /**
   * Log value to analytics service as new state when the selected value changes.
   */
  logSelectedValueAsNewState?: boolean
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  value?: T
} & TestProps &
  LogProps

type RadioValue = string | number | boolean

export const RadioGroup = <T extends RadioValue>({
  options = [],
  onChange,
  testID,
  value,
  logAction = PiwikAction.radioChange,
  logSelectedValueAsNewState = false,
  logDimensions = {},
  logCategory,
  logValue,
  ...props
}: RadioGroupProps<T>) => {
  const {trackCustomEvent} = usePiwik()

  const onPress = useCallback(
    (optionValue: T) => {
      onChange?.(optionValue)
      const logName = getLogNameFromProps({testID, ...props})

      if (logName) {
        const dimensions = logSelectedValueAsNewState
          ? {
              ...logDimensions,
              [PiwikDimension.newState]: optionValue.toString(),
            }
          : logDimensions

        trackCustomEvent(logName, logAction, dimensions, logCategory, logValue)
      }
    },
    [
      logAction,
      logCategory,
      logDimensions,
      logSelectedValueAsNewState,
      logValue,
      onChange,
      props,
      testID,
      trackCustomEvent,
    ],
  )

  return (
    <Column gutter="md">
      {options.map(({label, value: optionValue}) => (
        <Radio
          isSelected={value === optionValue}
          key={label}
          label={label}
          onPress={() => onPress(optionValue)}
          testID={
            testID ? `${testID}${optionValue.toString()}RadioButton` : undefined
          }
        />
      ))}
    </Column>
  )
}
