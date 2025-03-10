import {
  ParkingAccountDetails,
  ParkingEndpointName,
  ParkingLicensePlatesEndpointRequest,
  ParkingLicensePlatesEndpointResponse,
  ParkingLoginEndpointRequest,
  ParkingLoginEndpointResponse,
  ParkingPermitsEndpointResponse,
  ParkingRemoveLicensePlateEndpointRequest,
  ParkingRemoveLicensePlateEndpointResponse,
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
    [ParkingEndpointName.accountDetails]: builder.query<
      ParkingAccountDetails,
      string
    >({
      query: (accessToken: string) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        slug: ModuleSlug.parking,
        url: '/account-details',
        afterError,
      }),
    }),
    [ParkingEndpointName.licensePlates]: builder.query<
      ParkingLicensePlatesEndpointResponse,
      ParkingLicensePlatesEndpointRequest
    >({
      providesTags: ['LicensePlates'],
      query: ({accessToken, reportCode}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        params: {report_code: reportCode},
        slug: ModuleSlug.parking,
        url: '/license-plates',
        afterError,
      }),
    }),
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
    [ParkingEndpointName.removeLicensePlate]: builder.mutation<
      ParkingRemoveLicensePlateEndpointResponse,
      ParkingRemoveLicensePlateEndpointRequest
    >({
      invalidatesTags: ['LicensePlates'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        body,
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: '/license-plate',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useAccountDetailsQuery,
  useLicensePlatesQuery,
  useLoginMutation: useLoginParkingMutation,
  useRemoveLicensePlateMutation,
  usePermitsQuery,
} = parkingApi
