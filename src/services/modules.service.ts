import {GlobalApiSlug} from '@/environment'
import {ModuleServerConfig} from '@/modules/types'
import {baseApi} from '@/services/baseApi'
import {VERSION_NUMBER} from '@/utils/version'

export type ModulesResponse = {
  created: string
  deprecated: string
  isDeprecated: boolean
  isSupported: boolean
  latestReleaseNotes: string
  latestVersion: string
  modified: string
  modules: ModuleServerConfig[]
  published: string
  releaseNotes: string
  unpublished: string
  version: string
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRelease: builder.query<ModulesResponse, void>({
      providesTags: ['Modules'],
      query: () => ({
        slug: GlobalApiSlug.modules,
        url: `/release/${VERSION_NUMBER}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetReleaseQuery} = modulesApi
