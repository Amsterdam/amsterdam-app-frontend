// eslint-disable-next-line no-restricted-imports
import {version} from '@/../package.json'
import {ModuleServerConfig} from '@/modules/types'
import {baseApi} from '@/services/init'

export type ModulesResponse = {
  created: string
  modified: string
  modules: ModuleServerConfig[]
  published: string
  releaseNotes: string
  unpublished: string
  version: string
  versionInfo: {
    deprecated: boolean
    latest: string
    supported: boolean
  }
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRelease: builder.query<ModulesResponse, void>({
      providesTags: ['Modules'],
      query: () => ({
        api: 'modulesApiUrl',
        url: `/release/${version}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetReleaseQuery} = modulesApi
