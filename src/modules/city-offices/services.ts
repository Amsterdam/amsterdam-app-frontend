import {baseApi} from '../../services/init'
import {generateRequestUrl} from '../../utils'
import {CityOffice, CityOffices} from './types'

export const cityApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCityOffice: builder.query<CityOffice, string>({
      query: id => {
        return generateRequestUrl({path: '/city/office', params: {id}})
      },
      transformResponse: (response: {result: CityOffice}) => response.result,
    }),
    getCityOffices: builder.query<CityOffices, void>({
      query: () => {
        return '/city/offices'
      },
      transformResponse: (response: {result: CityOffices}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficeQuery, useGetCityOfficesQuery} = cityApi