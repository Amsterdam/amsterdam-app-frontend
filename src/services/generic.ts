import {Districts} from '../types'
import {baseApi} from './init'

export const genericApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDistricts: builder.query<Districts, void>({
      query: () => {
        return '/districts'
      },
      transformResponse: (response: {result: Districts}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetDistrictsQuery} = genericApi
