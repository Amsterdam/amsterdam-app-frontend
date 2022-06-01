import {version as appVersion} from '../../../package.json'
import {baseApi} from '../../services/init'
import {ModuleServerConfig} from '../types'

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
    getModules: builder.query<ModuleServerConfig[], void>({
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
  useGetModulesQuery,
  useSetModulesOrderMutation,
} = modulesApi
