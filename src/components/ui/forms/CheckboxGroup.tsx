import React from 'react'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {type TestProps} from '@/components/ui/types'

export type CheckboxOption = {
  label: string
  text: string
} & TestProps

export type CheckboxGroupProps = {
  onChange: (selected: string[]) => void
  options: CheckboxOption[]
  selectedValues: string[]
} & TestProps

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  testID,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionValue])
    } else {
      onChange(selectedValues.filter(v => v !== optionValue))
    }
  }

  return (
    <>
      {options.map(option => (
        <Checkbox
          key={option.text}
          label={option.label}
          onValueChange={checked => handleChange(option.text, checked)}
          testID={option.testID || testID}
          value={selectedValues.includes(option.text)}
        />
      ))}
    </>
  )
}
