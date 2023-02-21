import {baseApi} from '@/services/init'
import {Release} from '@/types'

export const releaseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRelease: builder.query<Release, string>({
      providesTags: ['Modules'],
      query: version => ({
        api: 'releaseApiUrl',
        url: `/release/${version}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetReleaseQuery} = releaseApi
