import {
  ParkingAccountDetails,
  ParkingEndpointName,
  LicensePlatesEndpointRequest,
  LicensePlatesEndpointResponse,
  ParkingLoginEndpointRequest,
  ParkingLoginEndpointResponse,
  ParkingPermitsEndpointResponse,
  RemoveLicensePlateEndpointRequest,
  RemoveLicensePlateEndpointResponse,
  AddLicensePlateEndpointRequest,
  AddLicensePlateEndpointResponse,
  ParkingSessionsEndpointResponse,
  ParkingSessionsEndpointRequest,
  ParkingSessionReceiptEndpointResponse,
  ParkingSessionReceiptEndpointRequestParams,
} from '@/modules/parking/types'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {RootState} from '@/store/types/rootState'
import {generateRequestUrl} from '@/utils/api'

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
    [ParkingEndpointName.addLicensePlate]: builder.mutation<
      AddLicensePlateEndpointResponse,
      AddLicensePlateEndpointRequest
    >({
      invalidatesTags: ['LicensePlates'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/license-plate',
        afterError,
      }),
    }),
    [ParkingEndpointName.licensePlates]: builder.query<
      LicensePlatesEndpointResponse,
      LicensePlatesEndpointRequest
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
    [ParkingEndpointName.parkingSessions]: builder.query<
      ParkingSessionsEndpointResponse,
      ParkingSessionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/sessions',
        afterError,
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
    [ParkingEndpointName.sessionReceipt]: builder.query<
      ParkingSessionReceiptEndpointResponse,
      ParkingSessionReceiptEndpointRequestParams
    >({
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/session/receipt', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.removeLicensePlate]: builder.mutation<
      RemoveLicensePlateEndpointResponse,
      RemoveLicensePlateEndpointRequest
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
        afterError,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useAccountDetailsQuery,
  useAddLicensePlateMutation,
  useLicensePlatesQuery,
  useLoginMutation: useLoginParkingMutation,
  useParkingSessionsQuery,
  useRemoveLicensePlateMutation,
  usePermitsQuery,
  useSessionReceiptQuery,
} = parkingApi
