import {skipToken} from '@reduxjs/toolkit/query'
import {useSurveyConfigByLocationQuery} from '@/modules/survey/service'

export const useDynamicForm = (entryPoint: string) => {
  const {data, isFetching, isError} = useSurveyConfigByLocationQuery(
    entryPoint ? entryPoint : skipToken,
  )

  return {data, isFetching, isError}
}
