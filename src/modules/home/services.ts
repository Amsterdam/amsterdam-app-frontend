import {version as appVersion} from '../../../package.json'
import {baseApi} from '../../services/init'
import {ServerModule} from '../types'

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
          api: 'modulesApiUrl',
          url: '/module',
          method: 'POST',
          body,
        }
      },
    }),
    getModules: builder.query<ServerModule[], void>({
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
      transformResponse: (response: {result: ServerModule[]}) =>
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
