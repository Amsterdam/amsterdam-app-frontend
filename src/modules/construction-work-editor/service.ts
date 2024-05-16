import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  BaseQueryApi,
} from '@reduxjs/toolkit/query'
import {
  removeConstructionWorkEditorToken,
  selectConstructionWorkEditorAccessToken,
} from '@/modules/construction-work-editor/slice'
import {
  AddProjectWarningQueryArgs,
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
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

const afterError = (
  {error}: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
  {
    dispatch,
  }: Pick<
    BaseQueryApi,
    'endpoint' | 'getState' | 'type' | 'extra' | 'forced' | 'dispatch'
  >,
) => {
  if (error?.status === 403) {
    dispatch(removeConstructionWorkEditorToken())
  }
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
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.second,
    }),
    [ConstructionWorkEditorEndpointName.addProjectWarning]: builder.mutation<
      ProjectWarningResponse,
      AddProjectWarningQueryArgs
    >({
      invalidatesTags: ['Articles', 'Projects'],
      query: ({projectId, ...body}) => ({
        body,
        method: 'POST',
        slug: MODULE_SLUG,
        url: `/manage/projects/${projectId}/warnings`,
        prepareHeaders,
        afterError,
      }),
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useAddProjectWarningMutation, useGetProjectsQuery} =
  constructionWorkEditorApi
