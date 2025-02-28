import {
  ParkingEndpointName,
  ParkingLoginEndpointRequest,
  ParkingLoginEndpointResponse,
  ParkingPermitsEndpointResponse,
} from '@/modules/parking/types'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {RootState} from '@/store/types/rootState'

const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch, getState},
  failRetry,
) => {
  if (error?.status === 403) {
    const {currentAccountType} = (getState() as RootState).parking

    return refreshAccessToken(currentAccountType, dispatch, failRetry)
  } else {
    failRetry('no access')
  }
}

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
        afterError,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useLoginMutation: useLoginParkingMutation, usePermitsQuery} =
  parkingApi
