import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {type SurveyConfigParam} from '@/modules/survey/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type SurveyState = Record<number, SurveyConfigParam>

const initialState: SurveyState = {}

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

      state[surveyId] = {
        surveyId,
        actionCount: 0,
        lastSeenAt: dayjs().toISOString(),
      }
    },
    addActionCount: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined || !state[surveyId]) {
        return
      }

      const survey = state[surveyId]

      survey.actionCount += 1
    },
    resetActionCount: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined || !state[surveyId]) {
        return
      }

      const survey = state[surveyId]

      survey.actionCount = 0
    },
    updateLastSeenAt: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined || !state[surveyId]) {
        return
      }

      const survey = state[surveyId]

      survey.lastSeenAt = dayjs().toISOString()
    },
  },
})

export const {
  addSurveyParams,
  addActionCount,
  resetActionCount,
  updateLastSeenAt,
} = surveySlice.actions

export const selectSurveysParams = (state: RootState) => state[ReduxKey.survey]
export const selectSurveyParams = (surveyId?: number) => (state: RootState) =>
  surveyId ? state[ReduxKey.survey][surveyId] : undefined
