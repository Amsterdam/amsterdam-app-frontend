import {version as appVersion} from '../../../package.json'
import {baseApi} from '../../services/init'
import {ServerModule} from '../types'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getModules: builder.query<ServerModule[], void>({
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
  }),
  overrideExisting: true,
})

export const {useGetModulesQuery} = modulesApi
