import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {
  CheckboxGroup,
  CheckboxOption,
} from '@/components/ui/forms/CheckboxGroup'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  options: CheckboxOption[]
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const CheckboxControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value = []},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <CheckboxGroup
      onChange={onChange}
      options={options}
      selectedValues={value}
      testID={testID}
    />
  )
}
