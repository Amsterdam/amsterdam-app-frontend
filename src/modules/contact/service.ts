import {
  CityOffice,
  ContactEndpointName,
  WaitingTime,
} from '@/modules/contact/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => ({
        slug: ModuleSlug.contact,
        url: '/city-offices',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => ({
        slug: ModuleSlug.contact,
        url: '/waiting-times',
      }),
      keepUnusedDataFor: CacheLifetime.none,
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
