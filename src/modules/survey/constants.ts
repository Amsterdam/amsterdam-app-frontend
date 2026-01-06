import {FieldType} from '@/components/ui/forms/input/types'
import {QuestionType} from '@/modules/survey/types'

export const choiceTypes = [
  QuestionType.checkbox,
  QuestionType.radio,
  QuestionType.rating,
  QuestionType.selection_buttons,
]

export const mapQuestionTypeToInputFieldType = {
  [QuestionType.text]: FieldType.text,
  [QuestionType.textarea]: FieldType.text,
  [QuestionType.email]: FieldType.email,
  [QuestionType.tel]: FieldType.tel,
  [QuestionType.numeric]: FieldType.numeric,
  [QuestionType.url]: FieldType.url,
} as const
