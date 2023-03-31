import {Radio} from '@/components/ui/forms'
import {Column} from '@/components/ui/layout'

export type RadioGroupOption<T> = {
  label: string
  value: T
}

type RadioGroupProps<T> = {
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  value?: T
}

type RadioValue = string | number | boolean

export const RadioGroup = <T extends RadioValue>({
  options = [],
  onChange,
  value,
}: RadioGroupProps<T>) => (
  <Column gutter="md">
    {options.map(({label, value: optionValue}) => (
      <Radio
        isSelected={value === optionValue}
        key={label}
        label={label}
        onPress={() => onChange(optionValue)}
      />
    ))}
  </Column>
)
