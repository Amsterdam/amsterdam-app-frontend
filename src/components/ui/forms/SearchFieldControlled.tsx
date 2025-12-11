import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'
import {
  SearchField,
  type SearchFieldProps,
} from '@/components/ui/forms/SearchField'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SearchFieldProps, 'value' | 'onChange' | 'onChangeText'> &
  UseControllerProps<TFieldValues, TName>

export const SearchFieldControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  testID,
  control,
  name,
  defaultValue,
  shouldUnregister,
  disabled,
  rules,
  ...searchFieldProps
}: Props<TFieldValues, TName>) => {
  const {field} = useController<TFieldValues, TName>({
    control,
    name,
    defaultValue,
    rules,
    disabled,
    shouldUnregister,
  })

  return (
    <SearchField
      onChangeText={field.onChange}
      testID={testID}
      {...searchFieldProps}
      {...field}
    />
  )
}
