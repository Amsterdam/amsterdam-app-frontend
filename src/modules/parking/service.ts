import {selectAccessTokenExpiration} from '@/modules/parking/slice'
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
  ParkingSessionStatus,
  RequestPinCode,
  ParkingManageVisitorTimeBalanceEndpointRequest,
  ParkingPermitScope,
} from '@/modules/parking/types'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {AfterBaseQueryErrorFn, PrepareHeaders} from '@/services/types'
import {RootState} from '@/store/types/rootState'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'
import {dayjs} from '@/utils/datetime/dayjs'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch, getState},
  failRetry,
) => {
  if (error?.status === 403) {
    const {currentAccountType} = (getState() as RootState).parking

    return refreshAccessToken(currentAccountType, dispatch, failRetry).then(
      () => Promise.resolve(),
    )
  } else {
    failRetry('no access')
  }
}

const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState
  const accessTokenExpiration = dayjs(selectAccessTokenExpiration(state))
  const {currentAccountType} = state.parking

  const item = await getSecureItem(
    currentAccountType === ParkingPermitScope.permitHolder
      ? SecureItemKey.parkingPermitHolder
      : SecureItemKey.parkingVisitor,
  )
  let {accessToken} = JSON.parse(item ?? '{}') as {accessToken: string}

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (accessTokenExpiration.isBefore(nowPlusMinute)) {
    const {accessToken: newAccessToken} = await refreshAccessToken(
      currentAccountType,
      dispatch,
      () => null,
    )

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('SSP-Access-Token', accessToken)
  }

  return headers
}

export const parkingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ParkingEndpointName.accountDetails]: builder.query<
      ParkingAccountDetails,
      void
    >({
      providesTags: ['ParkingAccount'],
      query: () => ({
        prepareHeaders,
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
      query: body => ({
        prepareHeaders,
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
      query: ({reportCode}) => ({
        prepareHeaders,
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
      query: ({...params}) => ({
        prepareHeaders,
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
      query: ({...params}) => ({
        prepareHeaders,
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
      query: ({...params}) => ({
        prepareHeaders,
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
      query: ({...params}) => ({
        prepareHeaders,
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
      query: body => ({
        headers: {
          ...deviceIdHeader,
        },
        prepareHeaders,
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
      query: body => ({
        headers: {
          ...deviceIdHeader,
        },
        prepareHeaders,
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
      query: ({...params}) => ({
        headers: {
          ...deviceIdHeader,
        },
        prepareHeaders,
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
      query: ({...params}) => ({
        prepareHeaders,
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
      query: body => ({
        body,
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/balance',
        afterError,
      }),
    }),
    [ParkingEndpointName.parkingPinCode]: builder.mutation<
      void,
      RequestPinCode
    >({
      invalidatesTags: ['ParkingPermits'],
      query: ({phoneLastFourDigits, reportCode}) => ({
        body: {report_code: reportCode, phone_number: phoneLastFourDigits},
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/pin-code',
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorChangePinCode]: builder.mutation<
      void,
      ParkingManageVisitorChangePinCodeEndpointRequest
    >({
      invalidatesTags: ['ParkingPermits'],
      query: body => ({
        prepareHeaders,
        body,
        method: 'PUT',
        slug: ModuleSlug.parking,
        url: '/visitor/pin-code',
        afterError,
      }),
    }),
    [ParkingEndpointName.manageVisitorTimeBalance]: builder.mutation<
      void,
      ParkingManageVisitorTimeBalanceEndpointRequest
    >({
      invalidatesTags: ['ParkingPermits'],
      query: body => ({
        prepareHeaders,
        body,
        method: 'POST',
        slug: ModuleSlug.parking,
        url: '/visitor/time-balance',
        afterError,
      }),
    }),
    [ParkingEndpointName.visitorParkingSessions]: builder.query<
      Record<ParkingSessionStatus, VisitorParkingSessionsEndpointResponse>,
      VisitorParkingSessionsEndpointRequest
    >({
      providesTags: ['ParkingSessions'],
      query: ({...params}) => ({
        prepareHeaders,
        method: 'GET',
        params,
        slug: ModuleSlug.parking,
        url: '/visitor/sessions',
        afterError,
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (
        response: VisitorParkingSessionsEndpointResponse,
      ) => ({
        [ParkingSessionStatus.active]:
          response.filter(
            session => session.status === ParkingSessionStatus.active,
          ) || [],
        [ParkingSessionStatus.completed]:
          response.filter(
            session => session.status === ParkingSessionStatus.completed,
          ) || [],
        [ParkingSessionStatus.cancelled]:
          response.filter(
            session => session.status === ParkingSessionStatus.cancelled,
          ) || [],
        [ParkingSessionStatus.planned]:
          response.filter(
            session => session.status === ParkingSessionStatus.planned,
          ) || [],
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
  useParkingPinCodeMutation,
  useParkingSessionsQuery,
  useParkingTransactionsQuery,
  useRemoveLicensePlateMutation,
  usePermitsQuery,
  useSessionReceiptQuery,
  useStartSessionMutation,
  useEditSessionMutation,
  useDeleteSessionMutation,
  useIncreaseBalanceMutation,
  useManageVisitorTimeBalanceMutation,
  useManageVisitorChangePinCodeMutation,
  useVisitorParkingSessionsQuery,
} = parkingApi
