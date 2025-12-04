import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'
import {Rating, type RatingProps} from '@/components/ui/forms/Rating'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RatingProps, 'rating' | 'onChange'> &
  UseControllerProps<TFieldValues, TName>

export const RatingControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ratingLabels,
  max,
  label,
  testID,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <Rating
      errorMessage={error?.message}
      label={label}
      max={max}
      onChange={onChange}
      rating={value}
      ratingLabels={ratingLabels}
      testID={testID}
    />
  )
}
