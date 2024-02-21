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
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  /**
   * Log value to analytics service as new state when the selected value changes and as name on the button press event of the option.
   */
  useOptionValuesForLogging?: boolean
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
  useOptionValuesForLogging = false,
  logDimensions = {},
  ...props
}: RadioGroupProps<T>) => {
  const onPress = usePiwikTrackCustomEventFromProps({
    ...props,
    logAction,
    logDimensions,
    onEvent: onChange,
    testID: testID,
  })

  return (
    <Column gutter="md">
      {options.map(({label, value: optionValue}, index) => {
        const logName = `${testID}${useOptionValuesForLogging ? optionValue.toString() : index}RadioButton`

        return (
          <Radio
            isSelected={value === optionValue}
            key={label}
            label={label}
            logName={logName}
            onPress={() =>
              onPress(
                optionValue,
                useOptionValuesForLogging
                  ? {
                      dimensions: {
                        [PiwikDimension.newState]: optionValue.toString(),
                      },
                    }
                  : {},
              )
            }
            sentry-label={logName}
            testID={`${testID}${optionValue.toString()}RadioButton`}
          />
        )
      })}
    </Column>
  )
}
