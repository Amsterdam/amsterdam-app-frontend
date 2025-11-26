import {
  type FieldPath,
  type FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {
  RadioGroup,
  type RadioGroupOption,
} from '@/components/ui/forms/RadioGroup'
import {type TestProps} from '@/components/ui/types'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: string
  options: RadioGroupOption<string>[]
  orientation?: 'horizontal' | 'vertical'
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const RadioGroupControlled = <
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
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <>
      <RadioGroup<string>
        errorMessage={error?.message}
        label={label}
        onChange={onChange}
        options={options}
        orientation={orientation}
        testID={testID}
        value={value}
      />
    </>
  )
}
