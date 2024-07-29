import {
  CityPass,
  CityPassTokensResponse,
  CityPassEndpointName,
} from '@/modules/city-pass/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const cityPassApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [CityPassEndpointName.getAccessToken]: builder.query<
      CityPassTokensResponse,
      void
    >({
      query: () => ({
        slug: ModuleSlug['city-pass'],
        url: '/session/init',
      }),
      keepUnusedDataFor: CacheLifetime.none,
    }),
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

export const {useGetAccessTokenQuery, useGetCityPassesQuery} = cityPassApi
