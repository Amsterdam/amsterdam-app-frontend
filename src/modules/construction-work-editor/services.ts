import {
  ConstructionWorkEditorEndpointName,
  ConstructionWorkEditorResponse,
} from '@/modules/construction-work-editor/types'
import {ProjectIdQueryArg} from '@/modules/construction-work/types'
import {baseApi} from '@/services'
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
  }),
  overrideExisting: true,
})

export const {useGetProjectManagerQuery} = constructionWorkEditorApi
