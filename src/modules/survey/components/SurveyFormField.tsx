import {View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import {OptionsControlled} from '@/components/ui/forms/OptionsControlled'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {SurveyConditionalFormField} from '@/modules/survey/components/SurveyConditionalFormField'
import {
  choiceTypes,
  mapQuestionTypeToInputFieldType,
} from '@/modules/survey/constants'
import {QuestionType, type Question} from '@/modules/survey/types'
import {snakeToPascalCase} from '@/utils/transform/snakeToPascalCase'

const REQUIRED_MESSAGE = 'Dit veld is verplicht'

export type SurveyFormFieldProps = {
  index: number
  question: Question
}

export const SurveyFormField = ({index, question}: SurveyFormFieldProps) => {
  const {choices, id, orientation, required, question_type} = question
  const testID: TestProps['testID'] = `Survey${snakeToPascalCase(question_type)}FormField`

  const formattedChoices = choices?.map(c => ({
    label: c.label,
    value: c.text,
  }))
  const isChoiceType = choiceTypes.includes(question_type)
  const isInputFieldType = Object.keys(
    mapQuestionTypeToInputFieldType,
  ).includes(question_type)

  return (
    <SurveyConditionalFormField
      conditions={question.conditions}
      conditionsType={question.conditions_type}>
      <View
        collapsable={false}
        testID={`SurveyQuestion${index}`}>
        {!!isChoiceType && (
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
        {!!isInputFieldType && (
          <TextInputField
            fieldType={
              mapQuestionTypeToInputFieldType[
                question_type as keyof typeof mapQuestionTypeToInputFieldType
              ]
            }
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
        )}
      </View>
    </SurveyConditionalFormField>
  )
}
