import {module as contactModule} from '@/modules/contact'
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
        return `/${contactModule.slug}/city-offices`
      },
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => {
        return `/${contactModule.slug}/waiting-times`
      },
      keepUnusedDataFor: 1,
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
