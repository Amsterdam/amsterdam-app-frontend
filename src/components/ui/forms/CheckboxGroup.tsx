import React from 'react'
import {OrientationBasedLayout} from '@/components/ui/containers/OrientationBasedLayout'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Label} from '@/components/ui/forms/Label'
import {Column} from '@/components/ui/layout/Column'
import {LayoutOrientation, type TestProps} from '@/components/ui/types'

export type CheckboxOption = {
  label: string
  value: string
}

export type CheckboxGroupProps = {
  errorMessage?: string
  label?: string
  onChange: (selected: string[]) => void
  options?: CheckboxOption[]
  orientation?: LayoutOrientation
  selectedValues: string[]
} & TestProps

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  errorMessage,
  label,
  options,
  selectedValues,
  onChange,
  orientation = LayoutOrientation.vertical,
  testID,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionValue])
    } else {
      onChange(selectedValues.filter(v => v !== optionValue))
    }
  }

  if (!options) {
    return null
  }

  return (
    <Column gutter="md">
      {!!label && <Label text={label} />}
      <OrientationBasedLayout
        gutter="md"
        orientation={orientation}
        wrap>
        {options.map(option => (
          <Checkbox
            key={option.value}
            label={option.label}
            onValueChange={checked => handleChange(option.value, checked)}
            testID={`${testID}${option.value}Checkbox`}
            value={selectedValues.includes(option.value)}
          />
        ))}
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
