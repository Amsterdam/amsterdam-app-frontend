import {
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
  NewMessage,
  ProjectWarningImageQueryArg,
  ProjectWarningResponse,
} from '@/modules/construction-work-editor/types'
import {ProjectIdQueryArg} from '@/modules/construction-work/types'
import {baseApi} from '@/services'
import {MutationResponse} from '@/types'
import {generateRequestUrl} from '@/utils'

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEditorEndpointName.getProjectManager]: builder.query<
      ConstructionWorkEditorResponse,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/manager', params}),
      transformResponse: (response: {
        result: [ConstructionWorkEditorResponse]
      }) => response.result[0],
    }),
    [ConstructionWorkEditorEndpointName.addProjectWarning]: builder.mutation<
      ProjectWarningResponse,
      NewMessage
    >({
      invalidatesTags: ['Articles'],
      query(body) {
        return {
          url: '/project/warning',
          method: 'POST',
          body,
        }
      },
      transformResponse: (response: {result: ProjectWarningResponse}) =>
        response.result,
    }),

    [ConstructionWorkEditorEndpointName.addProjectWarningImage]:
      builder.mutation<MutationResponse, ProjectWarningImageQueryArg>({
        invalidatesTags: ['Articles'],
        query(body) {
          return {
            url: '/project/warning/image',
            method: 'POST',
            body,
          }
        },
      }),
  }),
  overrideExisting: true,
})

export const {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
  useGetProjectManagerQuery,
} = constructionWorkEditorApi
