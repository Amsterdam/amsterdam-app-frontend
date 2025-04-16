import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form'
import {SelectButton} from '@/components/ui/forms/SelectButton'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {type TestProps} from '@/components/ui/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  bottomSheetVariant?: string
  iconName: SvgIconName
  text?:
    | string
    | ((value: PathValue<TFieldValues, TName>) => string | undefined)
  title: string | ((value: PathValue<TFieldValues, TName>) => string)
} & TestProps &
  UseControllerProps<TFieldValues, TName>

export const SelectButtonControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  bottomSheetVariant,
  testID,
  title,
  text,
  iconName,
  ...controllerProps
}: Props<TFieldValues, TName>) => {
  const {toggle} = useBottomSheet()
  const {
    field: {value},
    fieldState: {error},
  } = useController<TFieldValues, TName>(controllerProps)

  return (
    <SelectButton
      error={error}
      iconName={iconName}
      onPress={(): void => {
        toggle(bottomSheetVariant)
      }}
      testID={testID}
      text={typeof text === 'string' ? text : text?.(value)}
      title={typeof title === 'string' ? title : title?.(value)}
    />
  )
}
