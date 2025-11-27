import {useMemo} from 'react'
import {CheckboxGroupControlled} from '@/components/ui/forms/CheckboxGroupControlled'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {SurveyConditionalFormField} from '@/modules/survey/components/SurveyConditionalFormField'
import {QuestionType, type Question} from '@/modules/survey/types'

const REQUIRED_MESSAGE = 'Dit veld is verplicht'

export type SurveyFormFieldProps = {
  question: Question
}

export const SurveyFormField = ({question}: SurveyFormFieldProps) => {
  const {choices, id, orientation, required, question_type} = question
  const testID = 'SurveyFormField'

  const formattedChoices = choices?.map(c => ({
    label: c.label,
    value: c.text,
  }))

  const ChoicesComponent = useMemo(() => {
    if (question_type === QuestionType.checkbox) {
      return CheckboxGroupControlled
    }

    if (question_type === QuestionType.radio) {
      return RadioGroupControlled
    }

    return () => null
  }, [question_type])

  return (
    <SurveyConditionalFormField
      conditions={question.conditions}
      conditionsType={question.conditions_type}
      key={question.id}>
      {(question_type === QuestionType.text ||
        question_type === QuestionType.textarea) && (
        <TextInputField
          label={question.question_text}
          name={id.toString()}
          numberOfLines={question_type === QuestionType.text ? 1 : 4} //TODO: get from endpoint once ready
          placeholder={question.default ?? ''}
          rules={{
            required: required ? REQUIRED_MESSAGE : undefined,
          }}
          testID={testID}
        />
      )}
      <ChoicesComponent
        label={question.question_text}
        name={id.toString()}
        options={formattedChoices}
        orientation={orientation}
        rules={{
          required: required ? REQUIRED_MESSAGE : undefined,
        }}
        testID={testID}
      />
    </SurveyConditionalFormField>
  )
}
