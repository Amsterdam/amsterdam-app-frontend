import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {type SurveyConfigParams} from '@/modules/survey/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type SurveyState = {surveys: SurveyConfigParams}

const initialState: SurveyState = {surveys: []}

export const surveySlice = createSlice({
  name: ReduxKey.survey,
  initialState,
  reducers: {
    addSurveyParams: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined) {
        return
      }

      state.surveys.push({
        surveyId,
        actionCount: 0,
        lastSeenAt: dayjs().toISOString(),
      })
    },
    resetActionCount: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      const surveyParam = state.surveys.find(
        param => param.surveyId === surveyId,
      )

      if (surveyParam) {
        surveyParam.actionCount = 0
      }
    },
    updateSurveyParams: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      const surveyParam = state.surveys.find(
        param => param.surveyId === surveyId,
      )

      if (surveyParam) {
        surveyParam.actionCount = (surveyParam.actionCount ?? 0) + 1
        surveyParam.lastSeenAt = dayjs().toISOString()
      }
    },
  },
})

export const {addSurveyParams, resetActionCount, updateSurveyParams} =
  surveySlice.actions

export const selectSurveysParams = (state: RootState) =>
  state[ReduxKey.survey].surveys
export const selectSurveyParams = (surveyId?: number) => (state: RootState) =>
  state[ReduxKey.survey].surveys.find(param => param.surveyId === surveyId)
