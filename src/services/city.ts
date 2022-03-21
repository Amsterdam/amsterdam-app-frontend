import {CityOffice, CityOffices} from '../types/city'
import {generateRequestUrl} from '../utils'
import {baseApi} from './init'

export const cityApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCityOffice: builder.query<CityOffice, string>({
      query: id => {
        return generateRequestUrl('/city/office', {id})
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
