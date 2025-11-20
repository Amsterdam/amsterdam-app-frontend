import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const CheckboxControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <>
      <Checkbox
        label={label}
        onValueChange={onChange}
        testID={testID}
        value={value}
      />
    </>
  )
}
