import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
  BudgetTransaction,
  BudgetTransactionsParams,
  DiscountTransactionsResponse,
  TransactionsParams,
} from '@/modules/city-pass/types'
import {afterError} from '@/modules/city-pass/utils/afterError'
import {prepareHeaders} from '@/modules/city-pass/utils/prepareHeaders'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

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
