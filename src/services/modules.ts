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
          url: '/module',
          method: 'POST',
          body,
        }
      },
    }),
    getModules: builder.query<ModuleServerConfig[], void>({
      providesTags: ['Modules'],
      query: () => {
        return '/modules'
      },
      transformResponse: (response: {result: ModuleServerConfig[]}) =>
        response.result,
    }),
    setModulesOrder: builder.mutation<unknown, ModuleOrderQueryArg>({
      invalidatesTags: ['Modules'],
      query(body) {
        return {
          url: '/module_order',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useAddModuleMutation,
  useGetModulesQuery,
  useSetModulesOrderMutation,
} = modulesApi
