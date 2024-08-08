import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
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
    [CityPassEndpointName.getCityPasses]: builder.query<
      CityPassResponse,
      string
    >({
      query: accessToken => ({
        headers: {'Access-Token': accessToken},
        slug: ModuleSlug['city-pass'],
        url: '/data/passes',
      }),
      keepUnusedDataFor: CacheLifetime.none,
    }),
  }),
  overrideExisting: true,
})

export const {useGetAccessTokenQuery, useGetCityPassesQuery} = cityPassApi
