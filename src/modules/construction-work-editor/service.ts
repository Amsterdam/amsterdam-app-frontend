import {selectConstructionWorkEditorAccessToken} from '@/modules/construction-work-editor/slice'
import {
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
  NewMessage,
  ProjectWarningResponse,
} from '@/modules/construction-work-editor/types'
import {ModuleSlug} from '@/modules/slugs'
import {PrepareHeaders, baseApi} from '@/services/baseApi'
import {RootState} from '@/store/types/rootState'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const MODULE_SLUG = ModuleSlug['construction-work']

const prepareHeaders: PrepareHeaders = (headers, {getState}) => {
  const token = selectConstructionWorkEditorAccessToken(getState() as RootState)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEditorEndpointName.getProjects]: builder.query<
      ConstructionWorkEditorResponse,
      void
    >({
      query: () => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/manage/projects', params: {}}),
        prepareHeaders,
      }),
      keepUnusedDataFor: CacheLifetime.second,
    }),
    [ConstructionWorkEditorEndpointName.addProjectWarning]: builder.mutation<
      ProjectWarningResponse,
      NewMessage
    >({
      invalidatesTags: ['Articles', 'Projects'],
      query: body => ({
        body,
        method: 'POST',
        slug: MODULE_SLUG,
        url: '/manage/projects/{id}/warnings',
        prepareHeaders,
      }),
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useAddProjectWarningMutation, useGetProjectsQuery} =
  constructionWorkEditorApi
