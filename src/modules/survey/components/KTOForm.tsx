import {useCallback} from 'react'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'
import {useLatestSurveyQuery} from '@/modules/survey/service'
import {questionTypeToComponentMap} from '@/modules/survey/utils/questionTypeToComponentMap'
import {devLog} from '@/processes/development'

type Props = {
  unique_code?: string
}

export const KTOForm = ({unique_code = 'ams-app'}: Props) => {
  const {data, isFetching} = useLatestSurveyQuery(unique_code)

  const onSubmit = useCallback((formData: unknown) => {
    devLog('Form submitted:', formData)
  }, [])

  if (isFetching || !data) {
    return null
  }

  const knownQuestions = data.questions.filter(
    question => questionTypeToComponentMap[question.question_type],
  )

  return (
    <DynamicForm
      onSubmit={onSubmit}
      questions={knownQuestions}
    />
  )
}
