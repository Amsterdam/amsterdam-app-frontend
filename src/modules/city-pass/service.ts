import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
  BudgetTransaction,
  BudgetTransactionsParams,
  DiscountTransactionsResponse,
  TransactionsParams,
} from '@/modules/city-pass/types'
import {logout} from '@/modules/city-pass/utils/logout'
import {refreshTokens} from '@/modules/city-pass/utils/refreshTokens'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn} from '@/services/types'

type ApiError = {
  detail: string
}

/**
 * Removes a token that causes the backend to return a 403 forbidden error
 */
const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch},
  failRetry,
) => {
  if (error?.status === 403) {
    const {detail} = error.data as ApiError

    // TODO change this conditional to check for an enum and not match text
    if (detail === 'Access token has expired') {
      return refreshTokens(dispatch, failRetry)
    } else {
      await logout(dispatch)
      failRetry('no access')
    }
  }
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
    [CityPassEndpointName.getCityPasses]: builder.query<
      CityPassResponse,
      string
    >({
      query: accessToken => ({
        headers: {'Access-Token': accessToken},
        slug: ModuleSlug['city-pass'],
        url: '/data/passes',
        afterError,
      }),
    }),
    [CityPassEndpointName.getBudgetTransactions]: builder.query<
      BudgetTransaction[],
      BudgetTransactionsParams
    >({
      query: ({accessToken, passNumber, budgetCode}) => ({
        headers: {'Access-Token': accessToken},
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
      query: ({accessToken, passNumber}) => ({
        headers: {'Access-Token': accessToken},
        params: {passNumber},
        slug: ModuleSlug['city-pass'],
        url: '/data/aanbieding-transactions',
      }),
    }),
    [CityPassEndpointName.logout]: builder.mutation<void, string>({
      query: accessToken => ({
        headers: {'Access-Token': accessToken},
        method: 'POST',
        slug: ModuleSlug['city-pass'],
        url: '/session/logout',
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
