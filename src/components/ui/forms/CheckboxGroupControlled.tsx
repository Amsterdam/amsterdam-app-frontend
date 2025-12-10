import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {
  CheckboxGroup,
  type CheckboxGroupProps,
} from '@/components/ui/forms/CheckboxGroup'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<CheckboxGroupProps, 'selectedValues' | 'onChange'> &
  UseControllerProps<TFieldValues, TName>

export const CheckboxGroupControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  options,
  orientation,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value = []},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <CheckboxGroup
      errorMessage={error?.message}
      label={label}
      onChange={onChange}
      options={options}
      orientation={orientation}
      required={!!controllerProps.rules?.required}
      selectedValues={value}
      testID={testID}
    />
  )
}
