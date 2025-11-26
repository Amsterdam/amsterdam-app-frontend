import type {SurveysResponse, SurveyVersion} from '@/modules/survey/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const surveyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    surveys: builder.query<SurveysResponse, void>({
      query: () => ({
        slug: ModuleSlug.survey,
        url: '/surveys',
      }),
      providesTags: ['Form'],
    }),
    latestSurvey: builder.query<SurveyVersion, string>({
      query: unique_code => ({
        slug: ModuleSlug.survey,
        url: `/surveys/${unique_code}/latest`,
      }),
      providesTags: ['Form'],
    }),
  }),
  overrideExisting: false,
})

export const {useSurveysQuery, useLatestSurveyQuery} = surveyService
