import {useMemo} from 'react'
import {OrientationBasedLayout} from '@/components/ui/containers/OrientationBasedLayout'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Radio} from '@/components/ui/forms/Radio'
import {RateStar} from '@/components/ui/forms/RateStar'
import {SelectionButton} from '@/components/ui/forms/SelectionButton'
import {Column} from '@/components/ui/layout/Column'
import {LayoutOrientation, type TestProps} from '@/components/ui/types'
import {QuestionType} from '@/modules/survey/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {LogProps, PiwikAction, PiwikDimension} from '@/processes/piwik/types'

export type Option<T> = {
  label: string
  value: T
}

export type OptionsProps<T> = {
  errorMessage?: string
  label?: string
  onChange: (value: T | T[]) => void
  options?: Option<T>[]
  orientation?: LayoutOrientation
  required?: boolean
  type:
    | QuestionType.checkbox
    | QuestionType.radio
    | QuestionType.rating
    | QuestionType.selection_buttons
  /**
   * Log value to analytics as new state when the selected value changes and as name on the button press event of the option.
   */
  useOptionValuesForLogging?: boolean
  value?: T | T[]
} & TestProps &
  LogProps

type Value = string | number | boolean

export const Options = <T extends Value>({
  errorMessage,
  label,
  options = [],
  onChange,
  orientation = LayoutOrientation.vertical,
  required,
  testID,
  value,
  logAction = PiwikAction.radioChange,
  type,
  useOptionValuesForLogging = false,
  logDimensions = {},
  ...props
}: OptionsProps<T>) => {
  const onChangeCheckbox = (optionValue: T) => {
    const tempValue = value ?? []

    if (!Array.isArray(tempValue)) {
      return
    }

    const result = tempValue.includes(optionValue)
      ? tempValue.filter(v => v !== optionValue)
      : [...tempValue, optionValue]

    onChange(result)
  }

  const onPress = usePiwikTrackCustomEventFromProps({
    ...props,
    logAction,
    logDimensions,
    onEvent: type === QuestionType.checkbox ? onChangeCheckbox : onChange,
    testID,
  })

  const Option = useMemo(() => {
    if (type === QuestionType.selection_buttons) {
      return SelectionButton
    }

    if (type === QuestionType.checkbox) {
      return Checkbox
    }

    if (type === QuestionType.radio) {
      return Radio
    }

    if (type === QuestionType.rating) {
      return RateStar
    }

    return () => null
  }, [type])

  return (
    <Column gutter="md">
      {!!label && (
        <Label
          required={required}
          text={label}
        />
      )}
      <OrientationBasedLayout
        {...(type === QuestionType.radio ? {gutter: 'md'} : {})} // This is the only type that needs more spacing between horizontal items
        orientation={orientation}
        wrap>
        {options.map(
          ({label: optionLabel, value: optionValue}, index, allOptions) => {
            const logName = `${testID}${useOptionValuesForLogging ? optionValue.toString() : index}RadioButton`

            const isRatingValueHigherThanCurrent =
              type === QuestionType.rating &&
              !!value &&
              allOptions
                .slice(index)
                .some(({value: nextOptionValue}) => nextOptionValue === value)

            const isSelected =
              value === optionValue ||
              (Array.isArray(value) && value.includes(optionValue)) ||
              isRatingValueHigherThanCurrent

            return (
              <Option
                isSelected={isSelected}
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
          },
        )}
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
