import {version as appVersion} from '@/../package.json'
import {ModuleServerConfig} from '@/modules/types'
import {baseApi} from '@/services/init'

type RegisterModuleQueryArg = {
  app_version: string
} & ModuleServerConfig

type ModuleOrderQueryArg = {
  app_version: string
  order: string[]
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addModule: builder.mutation<unknown, RegisterModuleQueryArg>({
      invalidatesTags: ['Modules'],
      query(body) {
        return {
          api: 'modulesApiUrl',
          url: '/module',
          method: 'POST',
          body,
        }
      },
    }),
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
    setModulesOrder: builder.mutation<unknown, ModuleOrderQueryArg>({
      invalidatesTags: ['Modules'],
      query(body) {
        return {
          api: 'modulesApiUrl',
          url: '/module_order',
          method: 'POST',
          body,
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const {
  useAddModuleMutation,
  useGetModulesForAppQuery,
  useSetModulesOrderMutation,
} = modulesApi
