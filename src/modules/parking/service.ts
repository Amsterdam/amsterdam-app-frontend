import {
  ParkingEndpointName,
  ParkingLoginEndpointRequest,
  ParkingLoginEndpointResponse,
  ParkingPermitsEndpointResponse,
} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const parkingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ParkingEndpointName.login]: builder.mutation<
      ParkingLoginEndpointResponse,
      ParkingLoginEndpointRequest
    >({
      query: body => ({
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/login',
      }),
    }),
    [ParkingEndpointName.permits]: builder.query<
      ParkingPermitsEndpointResponse,
      string
    >({
      query: (accessToken: string) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        slug: ModuleSlug.parking,
        url: '/permits',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useLoginMutation: useLoginParkingMutation, usePermitsQuery} =
  parkingApi
