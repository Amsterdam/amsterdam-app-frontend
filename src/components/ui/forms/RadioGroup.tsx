import {OrientationBasedLayout} from '@/components/ui/containers/OrientationBasedLayout'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Radio} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {LayoutOrientation, type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'

export type RadioGroupOption<T> = {
  label: string
  value: T
}

type RadioGroupProps<T> = {
  errorMessage?: string
  label?: string
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  orientation?: LayoutOrientation
  /**
   * Log value to analytics service as new state when the selected value changes and as name on the button press event of the option.
   */
  useOptionValuesForLogging?: boolean
  value?: T
} & TestProps &
  LogProps

type RadioValue = string | number | boolean

export const RadioGroup = <T extends RadioValue>({
  errorMessage,
  label,
  options = [],
  onChange,
  orientation = LayoutOrientation.vertical,
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
    testID,
  })

  return (
    <Column gutter="md">
      {!!label && <Label text={label} />}
      <OrientationBasedLayout
        gutter="md"
        orientation={orientation}
        wrap>
        {options.map(({label: optionLabel, value: optionValue}, index) => {
          const logName = `${testID}${useOptionValuesForLogging ? optionValue.toString() : index}RadioButton`

          return (
            <Radio
              isSelected={value === optionValue}
              key={optionLabel}
              label={optionLabel}
              logging-label={logName}
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
              testID={`${testID}${optionValue.toString()}RadioButton`}
            />
          )
        })}
      </OrientationBasedLayout>
      {!!errorMessage && (
        <ErrorMessage
          testID={`${testID}ErrorMessage`}
          text={errorMessage}
        />
      )}
    </Column>
  )
}
