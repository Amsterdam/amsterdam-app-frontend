import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {DynamicForm} from '@/modules/survey/components/DynamicForm'
import {useSurveyConfigByLocationQuery} from '@/modules/survey/service'
import {devLog} from '@/processes/development'

export type DynamicSurveyFormProps = {
  entryPoint?: string
}

export const DynamicSurveyForm = ({entryPoint}: DynamicSurveyFormProps) => {
  const {data, isFetching} = useSurveyConfigByLocationQuery(
    entryPoint ? entryPoint : skipToken,
  )
  const form = data?.survey
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
