import {ServerModule} from '../modules/types'
import {baseApi} from './init'

type RegisterModuleQueryArg = {
  app_version: string
} & ServerModule

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
    getModules: builder.query<ServerModule[], void>({
      providesTags: ['Modules'],
      query: () => {
        return '/modules'
      },
      transformResponse: (response: {result: ServerModule[]}) =>
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
