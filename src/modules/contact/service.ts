import {module as contactModule} from '@/modules/contact'
import {
  CityOffice,
  ContactEndpointName,
  ContactEndpointUrl,
  WaitingTime,
} from '@/modules/contact/types'
import {baseApi} from '@/services'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => {
        return `/${contactModule.slug}/${ContactEndpointUrl.cityOffices}`
      },
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
    [ContactEndpointName.getWaitingTimes]: builder.query<WaitingTime[], void>({
      query: () => {
        return `/${contactModule.slug}/${ContactEndpointUrl.waitingTimes}`
      },
      keepUnusedDataFor: 1,
      transformResponse: (response: {result: WaitingTime[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery, useGetWaitingTimesQuery} = contactApi
