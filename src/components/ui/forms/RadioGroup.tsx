import {useCallback} from 'react'
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

export const RadioGroup = <T,>({
  options = [],
  onChange,
  value,
}: RadioGroupProps<T>) => {
  const handleChange = useCallback(
    (optionValue: T) => {
      onChange(optionValue)
    },
    [onChange],
  )

  return (
    <Column gutter="md">
      {options.map(({label, value: optionValue}) => (
        <Radio
          isSelected={value === optionValue}
          key={label}
          label={label}
          onPress={() => handleChange(optionValue)}
        />
      ))}
    </Column>
  )
}
