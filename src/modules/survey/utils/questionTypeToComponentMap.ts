import type {QuestionType} from '@/modules/survey/types'
import {CheckboxControlled} from '@/components/ui/forms/CheckboxControlled'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {TextInputField} from '@/components/ui/forms/TextInputField'

export const questionTypeToComponentMap: Record<
  QuestionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<any>
> = {
  checkbox: CheckboxControlled,
  radio: RadioGroupControlled,
  text: TextInputField,
  textarea: TextInputField,
}
