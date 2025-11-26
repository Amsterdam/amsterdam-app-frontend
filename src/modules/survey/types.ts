export enum ConditionEquation {
  'contains' = 'contains',
  'equal' = 'equal',
  'not_contains' = 'not_contains',
  'not_equal' = 'not_equal',
}

export enum QuestionType {
  checkbox = 'checkbox',
  radio = 'radio',
  text = 'text',
  textarea = 'textarea',
}
export enum ConditionType {
  'and' = 'and',
  'or' = 'or',
}
enum Orientation {
  'horizontal' = 'horizontal',
  'vertical' = 'vertical',
}

export type Condition = {
  reference_question: number
  type: ConditionEquation
  value: string
}

export type Choice = {
  label: string
  show_textfield: boolean
  text: string
}

export type Question = {
  choices?: Choice[]
  conditions: Condition[]
  conditions_type?: ConditionType
  default?: string | null
  description?: string | null
  id: number
  max_characters?: number
  min_characters?: number
  orientation?: Orientation
  question_text: string
  question_type: QuestionType
  required: boolean
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
