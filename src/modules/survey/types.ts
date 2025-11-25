export type TypeEnum = 'equal' | 'not_equal' | 'contains' | 'not_contains'
export type Condition = {
  reference_question: number
  type: TypeEnum
  value: string
}
export enum QuestionType {
  checkbox = 'checkbox',
  radio = 'radio',
  text = 'text',
  textarea = 'textarea',
}
export type ResponseTypeEnum = 'number' | 'text' | 'boolean'
export type ConditionsTypeEnum = 'and' | 'or'
export type OrientationEnum = 'horizontal' | 'vertical'

export type Choice = {
  label: string
  show_textfield: boolean
  text: string
}

export type Question = {
  choices?: Choice[]
  conditions: Condition[]
  conditions_type?: ConditionsTypeEnum
  default?: string | null
  description?: string | null
  id: number
  max_characters?: number
  min_characters?: number
  orientation?: OrientationEnum
  question_text: string
  question_type: QuestionType
  required: boolean
  response_type?: ResponseTypeEnum
  sort_order?: number | null
}
export type SurveyVersion = {
  active_from: string
  created_at: string
  questions: Question[]
  version: number
}

export type Survey = SurveyVersion & {
  description: string
  latest_version: SurveyVersion
  team: string
  title: string
  unique_code: string
}

export type SurveysResponse = Survey[]
