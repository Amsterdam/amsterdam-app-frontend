import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useSurveyConfigByLocationQuery} from '@/modules/survey/service'
import {devLog} from '@/processes/development'

export const useDynamicForm = (entryPoint: string) => {
  const {data, isFetching, isError} = useSurveyConfigByLocationQuery(
    entryPoint ? entryPoint : skipToken,
  )
  const onSubmit = useCallback((formData: unknown) => {
    devLog('Form submitted:', formData)
  }, [])

  return {survey: data?.survey.latest_version, isFetching, isError, onSubmit}
}
