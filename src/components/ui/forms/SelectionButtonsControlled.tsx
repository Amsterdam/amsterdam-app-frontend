import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'
import {
  SelectionButtons,
  type SelectionButtonProps,
} from '@/components/ui/forms/SelectionButtons'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SelectionButtonProps, 'selected' | 'onPress'> &
  UseControllerProps<TFieldValues, TName>

export const SelectionButtonsControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options = [],
  label,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <SelectionButtons
      errorMessage={error?.message}
      label={label}
      onPress={onChange}
      options={options}
      required={!!controllerProps.rules?.required}
      selected={value}
      testID={testID}
    />
  )
}
