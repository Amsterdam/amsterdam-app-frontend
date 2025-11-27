import type {
  SurveyConfigByLocationResponse,
  SurveysResponse,
  SurveyVersion,
  SurveyVersionEntryParams,
} from '@/modules/survey/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const surveyService = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSurveyVersionEntry: builder.mutation<void, SurveyVersionEntryParams>({
      query: ({unique_code, version, ...body}) => ({
        slug: ModuleSlug.survey,
        url: `/surveys/${unique_code}/versions/${version}/entries`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Form'],
    }),
    latestSurvey: builder.query<SurveyVersion, string>({
      query: unique_code => ({
        slug: ModuleSlug.survey,
        url: `/surveys/${unique_code}/latest`,
      }),
      providesTags: ['Form'],
    }),
    surveys: builder.query<SurveysResponse, void>({
      query: () => ({
        slug: ModuleSlug.survey,
        url: '/surveys',
      }),
      providesTags: ['Form'],
    }),
    surveyConfigByLocation: builder.query<
      SurveyConfigByLocationResponse,
      string
    >({
      query: location => ({
        slug: ModuleSlug.survey,
        url: `/config/${location}`,
      }),
      providesTags: ['Form'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateSurveyVersionEntryMutation,
  useSurveysQuery,
  useSurveyConfigByLocationQuery,
  useLatestSurveyQuery,
} = surveyService
