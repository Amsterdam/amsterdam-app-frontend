import {useCallback} from 'react'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'
import {useSurveysQuery} from '@/modules/survey/service'
import {devLog} from '@/processes/development'

export type DynamicSurveyFormProps = {
  unique_code?: string
}

export const DynamicSurveyForm = ({
  unique_code = 'ams-app',
}: DynamicSurveyFormProps) => {
  const {data, isFetching} = useSurveysQuery() // TODO: use /latest endpoint when this works
  const form = data?.find(survey => survey.unique_code === unique_code)
  const onSubmit = useCallback((formData: unknown) => {
    devLog('Form submitted:', formData)
  }, [])

  if (isFetching || !form) {
    return null
  }

  return (
    <DynamicForm
      onSubmit={onSubmit}
      questions={form.latest_version.questions}
    />
  )
}
