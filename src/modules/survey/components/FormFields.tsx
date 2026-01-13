import type {Question} from '@/modules/survey/types'
import {SurveyFormField} from '@/modules/survey/components/SurveyFormField'

type Props = {
  questions?: Question[]
}

export const FormFields = ({questions}: Props) =>
  questions
    ? questions.map((question, index) => (
        <SurveyFormField
          index={index}
          key={question.id}
          question={question}
        />
      ))
    : null
