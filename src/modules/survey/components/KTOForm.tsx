import {useCallback} from 'react'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'
import {useSurveysQuery} from '@/modules/survey/service'
import {questionTypeToComponentMap} from '@/modules/survey/utils/questionTypeToComponentMap'
import {devLog} from '@/processes/development'

export type KTOFormProps = {
  unique_code?: string
}

export const KTOForm = ({unique_code = 'ams-app'}: KTOFormProps) => {
  const {data, isFetching} = useSurveysQuery() // TODO: use /latest endpoint when this works
  const form = data?.find(survey => survey.unique_code === unique_code)
  const onSubmit = useCallback((formData: unknown) => {
    devLog('Form submitted:', formData)
  }, [])

  if (isFetching || !form) {
    return null
  }

  const knownQuestions = form.latest_version.questions.filter(
    question => questionTypeToComponentMap[question.question_type],
  )

  return (
    <DynamicForm
      onSubmit={onSubmit}
      questions={knownQuestions}
    />
  )
}
