import {contactModule} from '@/modules/contact'
import {
  CityOffice,
  ContactEndpointName,
  WaitingTime,
} from '@/modules/contact/types'
import {baseApi} from '@/services'
import {CacheLifetime} from '@/types'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => `/${contactModule.slug}/city-offices`,
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => `/${contactModule.slug}/waiting-times`,
      keepUnusedDataFor: CacheLifetime.none,
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
