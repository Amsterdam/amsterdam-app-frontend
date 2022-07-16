import {ProjectManagerResponse} from '@/modules/construction-work-editor/types'
import {
  ProjectIdQueryArg,
  ProjectsEndpointName,
} from '@/modules/construction-work/types'
import {baseApi} from '@/services'
import {generateRequestUrl} from '@/utils'

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.getProjectManager]: builder.query<
      ProjectManagerResponse,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/manager', params}),
      transformResponse: (response: {result: [ProjectManagerResponse]}) =>
        response.result[0],
    }),
  }),
  overrideExisting: true,
})

export const {useGetProjectManagerQuery} = constructionWorkEditorApi
