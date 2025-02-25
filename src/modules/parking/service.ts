import {
  ParkingEndpointName,
  ParkingLoginEndpointRequest,
  ParkingLoginEndpointResponse,
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
  }),
  overrideExisting: true,
})

export const {useLoginMutation: useLoginParkingMutation} = parkingApi
