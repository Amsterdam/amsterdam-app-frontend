import {
  selectAccessTokenExpiration,
  selectRefreshTokenExpiration,
} from '@/modules/city-pass/slice'
import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
  BudgetTransaction,
  BudgetTransactionsParams,
  DiscountTransactionsResponse,
  TransactionsParams,
  CityPassApiError,
  CityPassError401Codes,
} from '@/modules/city-pass/types'
import {logout} from '@/modules/city-pass/utils/logout'
import {refreshTokens} from '@/modules/city-pass/utils/refreshTokens'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn, PrepareHeaders} from '@/services/types'
import {RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

/**
 * Removes a token that causes the backend to return a 403 forbidden error
 */
const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch},
  failRetry,
) => {
  if (error?.status === 401) {
    const {code} = error.data as CityPassApiError

    if (code === CityPassError401Codes.tokenExpired) {
      return refreshTokens(dispatch, failRetry).then(() => Promise.resolve())
    } else {
      await logout('logoutWarning', dispatch)
      failRetry('no access')
    }
  }
}

const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState
  const accessTokenExpiration = dayjs(selectAccessTokenExpiration(state))
  const refreshTokenExpiration = dayjs(selectRefreshTokenExpiration(state))

  let accessToken = await getSecureItem(SecureItemKey.cityPassAccessToken)

  const nowPlusMinute = dayjs().add(1, 'minute')

  if (
    accessTokenExpiration.isBefore(nowPlusMinute) ||
    refreshTokenExpiration.isBefore(nowPlusMinute)
  ) {
    const {accessToken: newAccessToken} = await refreshTokens(dispatch)

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('Access-Token', accessToken)
  }

  return headers
}

export const cityPassApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [CityPassEndpointName.getAccessToken]: builder.mutation<
      CityPassTokensResponse,
      void
    >({
      query: () => ({
        method: 'POST',
        slug: ModuleSlug['city-pass'],
        url: '/session/init',
      }),
    }),
    [CityPassEndpointName.getCityPasses]: builder.query<CityPassResponse, void>(
      {
        query: () => ({
          prepareHeaders,
          slug: ModuleSlug['city-pass'],
          url: '/data/passes',
          afterError,
        }),
      },
    ),
    [CityPassEndpointName.getBudgetTransactions]: builder.query<
      BudgetTransaction[],
      BudgetTransactionsParams
    >({
      query: ({passNumber, budgetCode}) => ({
        prepareHeaders,
        params: {passNumber, budgetCode},
        slug: ModuleSlug['city-pass'],
        url: '/data/budget-transactions',
        afterError,
      }),
    }),
    [CityPassEndpointName.getDiscountTransactions]: builder.query<
      DiscountTransactionsResponse,
      TransactionsParams
    >({
      query: ({passNumber}) => ({
        prepareHeaders,
        params: {passNumber},
        slug: ModuleSlug['city-pass'],
        url: '/data/aanbieding-transactions',
      }),
    }),
    [CityPassEndpointName.logout]: builder.mutation<void, void>({
      query: () => ({
        prepareHeaders,
        method: 'POST',
        slug: ModuleSlug['city-pass'],
        url: '/session/logout',
        afterError,
      }),
    }),
    [CityPassEndpointName.refreshToken]: builder.mutation<
      CityPassTokensResponse,
      string
    >({
      query: refreshToken => ({
        method: 'POST',
        slug: ModuleSlug['city-pass'],
        url: '/session/refresh',
        body: {refresh_token: refreshToken},
      }),
    }),
  }),
  overrideExisting: true,
})
export const {
  useGetAccessTokenMutation,
  useGetBudgetTransactionsQuery,
  useGetDiscountTransactionsQuery,
  useGetCityPassesQuery,
  useLogoutMutation,
} = cityPassApi
