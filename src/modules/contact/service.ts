import {module as contactModule} from '@/modules/contact'
import {
  CityOffice,
  ContactEndpointName,
  WaitingTime,
} from '@/modules/contact/types'
import {baseApi} from '@/services'
import {CacheTimeout} from '@/types'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => `/${contactModule.slug}/city-offices`,
      keepUnusedDataFor: CacheTimeout.hour,
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => `/${contactModule.slug}/waiting-times`,
      keepUnusedDataFor: CacheTimeout.none,
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
