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
  ParkingStartSessionEndpointRequestParams,
  ParkingPermitsEndpointRequestParams,
  ParkingOrderResponse,
  ParkingEditSessionEndpointRequestParams,
  ParkingDeleteSessionEndpointRequestParams,
  RemoveIncreaseBalanceEndpointRequest,
  ParkingTransactionsEndpointRequest,
  ParkingTransactionsEndpointResponse,
  ParkingManageVisitorChangePinCodeEndpointRequest,
  VisitorParkingSessionsEndpointRequest,
  VisitorParkingSessionsEndpointResponse,
} from '@/modules/parking/types'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {RootState} from '@/store/types/rootState'
import {CacheLifetime} from '@/types/api'
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
      providesTags: ['ParkingAccount'],
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
      invalidatesTags: ['ParkingLicensePlates'],
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
      providesTags: ['ParkingLicensePlates'],
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
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    [ParkingEndpointName.parkingTransactions]: builder.query<
      ParkingTransactionsEndpointResponse,
      ParkingTransactionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/transactions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
    }),
    [ParkingEndpointName.permits]: builder.query<
      ParkingPermitsEndpointResponse,
      ParkingPermitsEndpointRequestParams
    >({
      providesTags: ['ParkingPermits'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/permits', params}),
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
    [ParkingEndpointName.startSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingStartSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
          ...deviceIdHeader,
        },
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/session',
        afterError,
      }),
    }),
    [ParkingEndpointName.editSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingEditSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
          ...deviceIdHeader,
        },
        body,
        method: 'PATCH',
        slug: ModuleSlug.parking,
        url: '/session',
        afterError,
      }),
    }),
    [ParkingEndpointName.deleteSession]: builder.mutation<
      ParkingOrderResponse,
      ParkingDeleteSessionEndpointRequestParams
    >({
      invalidatesTags: ['ParkingSessions'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
          ...deviceIdHeader,
        },
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/session', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.removeLicensePlate]: builder.mutation<
      RemoveLicensePlateEndpointResponse,
      RemoveLicensePlateEndpointRequest
    >({
      invalidatesTags: ['ParkingLicensePlates'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'DELETE',
        slug: ModuleSlug.parking,
        url: generateRequestUrl({path: '/license-plate', params}),
        afterError,
      }),
    }),
    [ParkingEndpointName.increaseBalance]: builder.mutation<
      ParkingOrderResponse,
      RemoveIncreaseBalanceEndpointRequest
    >({
      invalidatesTags: ['ParkingAccount'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/balance',
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorChangePinCode]: builder.mutation<
      void,
      ParkingManageVisitorChangePinCodeEndpointRequest
    >({
      invalidatesTags: ['ParkingPermits'],
      query: ({accessToken, ...body}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        body,
        method: 'PUT',
        slug: ModuleSlug.parking,
        url: '/visitor/pin-code',
        afterError,
      }),
    [ParkingEndpointName.visitorParkingSessions]: builder.query<
      VisitorParkingSessionsEndpointResponse,
      VisitorParkingSessionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({accessToken, ...params}) => ({
        headers: {
          'SSP-Access-Token': accessToken,
        },
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/visitor/sessions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
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
  useParkingTransactionsQuery,
  useRemoveLicensePlateMutation,
  usePermitsQuery,
  useSessionReceiptQuery,
  useStartSessionMutation,
  useEditSessionMutation,
  useDeleteSessionMutation,
  useIncreaseBalanceMutation,
  useManageVisitorChangePinCodeMutation,
  useVisitorParkingSessionsQuery,
} = parkingApi
