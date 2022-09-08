import {CityOffice, ContactEndpointName} from '@/modules/contact/types'
import {baseApi} from '@/services'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => {
        return '/city/offices'
      },
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery} = contactApi
