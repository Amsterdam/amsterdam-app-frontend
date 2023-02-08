import {ModuleServerConfig} from '@/modules/types'
import {baseApi} from '@/services/init'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesForApp: builder.query<ModuleServerConfig[], void>({
      providesTags: ['Modules'],
      query: () => ({
        api: 'modulesApiUrl',
        url: '/modules_for_app',
      }),
      transformResponse: (response: {result: ModuleServerConfig[]}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetModulesForAppQuery} = modulesApi
