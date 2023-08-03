import {baseApi} from '@/services/init'
import {Release} from '@/types/release'

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRelease: builder.query<Release, string>({
      providesTags: ['Modules'],
      query: version => ({
        api: 'modulesApiUrl',
        url: `/release/${version}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetReleaseQuery} = modulesApi
