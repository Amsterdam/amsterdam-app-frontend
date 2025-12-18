import {OptionsControlled} from '@/components/ui/forms/OptionsControlled'
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

  return (
    <SurveyConditionalFormField
      conditions={question.conditions}
      conditionsType={question.conditions_type}
      key={question.id}>
      {question_type === QuestionType.text ||
      question_type === QuestionType.textarea ? (
        <TextInputField
          hasClearButton={false}
          label={question.question_text}
          name={id.toString()}
          numberOfLines={
            question_type === QuestionType.textarea && question.textarea_rows
              ? question.textarea_rows
              : undefined
          }
          rules={{
            required: required ? REQUIRED_MESSAGE : undefined,
          }}
          testID={testID}
        />
      ) : (
        <OptionsControlled
          label={question.question_text}
          name={id.toString()}
          options={formattedChoices}
          orientation={orientation}
          rules={{
            required: required ? REQUIRED_MESSAGE : undefined,
          }}
          testID={testID}
          type={question_type}
        />
      )}
    </SurveyConditionalFormField>
  )
}
