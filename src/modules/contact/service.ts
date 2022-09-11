import {
  CityOffice,
  ContactEndpointName,
  WaitingTime,
} from '@/modules/contact/types'
import {baseApi} from '@/services'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => {
        return '/city/offices'
      },
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => {
        return '/waiting_times'
      },
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
