import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
  BudgetTransaction,
  BudgetTransactionsParams,
  DiscountTransactionsResponse,
  TransactionsParams,
} from '@/modules/city-pass/types'
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
    [CityPassEndpointName.getCityPasses]: builder.query<
      CityPassResponse,
      string
    >({
      query: accessToken => ({
        headers: {'Access-Token': accessToken},
        slug: ModuleSlug['city-pass'],
        url: '/data/passes',
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
