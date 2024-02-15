import {Radio} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'

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
  ...props
}: RadioGroupProps<T>) => {
  const onPress = usePiwikTrackCustomEventFromProps({
    ...props,
    logAction,
    logDimensions,
    onEvent: onChange,
    testID,
  })

  return (
    <Column gutter="md">
      {options.map(({label, value: optionValue}) => (
        <Radio
          isSelected={value === optionValue}
          key={label}
          label={label}
          onPress={() =>
            onPress(
              optionValue,
              logSelectedValueAsNewState
                ? {
                    dimensions: {
                      [PiwikDimension.newState]: optionValue.toString(),
                    },
                  }
                : {},
            )
          }
          testID={
            testID ? `${testID}${optionValue.toString()}RadioButton` : undefined
          }
        />
      ))}
    </Column>
  )
}
