// eslint-disable-next-line no-restricted-imports
import {version as appVersion} from '@/../package.json'
import {ModuleServerConfig} from '@/modules/types'
import {baseApi} from '@/services/init'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModulesForApp: builder.query<ModuleServerConfig[], void>({
      providesTags: ['Modules'],
      query: () => {
        return {
          api: 'modulesApiUrl',
          headers: {
            appVersion,
          },
          url: '/modules_for_app',
        }
      },
      transformResponse: (response: {result: ModuleServerConfig[]}) =>
        response.result,
    }),
  }),
})

export const {useGetModulesForAppQuery} = modulesApi
