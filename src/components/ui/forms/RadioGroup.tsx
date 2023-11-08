import {Radio} from '@/components/ui/forms/Radio'
import {Column} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'

export type RadioGroupOption<T> = {
  label: string
  value: T
}

type RadioGroupProps<T> = {
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  value?: T
} & TestProps

type RadioValue = string | number | boolean

export const RadioGroup = <T extends RadioValue>({
  options = [],
  onChange,
  testID,
  value,
}: RadioGroupProps<T>) => (
  <Column gutter="md">
    {options.map(({label, value: optionValue}) => (
      <Radio
        accessibilityRole="radio"
        isSelected={value === optionValue}
        key={label}
        label={label}
        onPress={() => onChange(optionValue)}
        testID={
          testID ? `${testID}${optionValue.toString()}RadioButton` : undefined
        }
      />
    ))}
  </Column>
)
