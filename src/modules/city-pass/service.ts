import {CityPass, CityPassEndpointName} from '@/modules/city-pass/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const cityPassApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [CityPassEndpointName.getCityPasses]: builder.query<CityPass[], void>({
      query: () => ({
        slug: ModuleSlug['city-pass'],
        url: '/city-passes',
      }),
      keepUnusedDataFor: CacheLifetime.none,
      transformResponse: (response: {result: CityPass[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityPassesQuery} = cityPassApi
