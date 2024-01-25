import {ProjectIdQueryArgs} from '@/modules/construction-work/types/api'
import {
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
  NewMessage,
  ProjectWarningImageQueryArg,
  ProjectWarningResponse,
} from '@/modules/construction-work-editor/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/init'
import {CacheLifetime, MutationResponse} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const MODULE_SLUG = ModuleSlug['construction-work']

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEditorEndpointName.getProjectManager]: builder.query<
      ConstructionWorkEditorResponse,
      ProjectIdQueryArgs
    >({
      query: params => ({
        slug: MODULE_SLUG,
        url: generateRequestUrl({path: '/project/manager', params}),
      }),
      keepUnusedDataFor: CacheLifetime.second,
      transformResponse: (response: {
        result: [ConstructionWorkEditorResponse]
      }) => response.result[0],
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
        url: '/project/warning',
      }),
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),

    [ConstructionWorkEditorEndpointName.addProjectWarningImage]:
      builder.mutation<MutationResponse, ProjectWarningImageQueryArg>({
        invalidatesTags: ['Articles', 'Projects'],
        query: body => ({
          body,
          method: 'POST',
          slug: MODULE_SLUG,
          url: '/project/warning/image',
        }),
      }),
  }),
  overrideExisting: true,
})

export const {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
  useGetProjectManagerQuery,
} = constructionWorkEditorApi
