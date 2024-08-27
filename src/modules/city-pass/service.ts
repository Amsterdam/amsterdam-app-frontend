import {ThunkDispatch} from '@reduxjs/toolkit'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {
  CityPassTokensResponse,
  CityPassEndpointName,
  CityPassResponse,
  BudgetTransaction,
  BudgetTransactionsParams,
} from '@/modules/city-pass/types'
import {getSecureTokens} from '@/modules/city-pass/utils/getSecureTokens'
import {setSecureTokens} from '@/modules/city-pass/utils/setSecureTokens'
import {ModuleSlug} from '@/modules/slugs'
import {devError, devLog} from '@/processes/development'
import {baseApi} from '@/services/baseApi'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {setAlertAction} from '@/store/slices/alert'
import {
  deleteSecureItemUpdatedTimestamp,
  setSecureItemUpdatedTimestamp,
} from '@/store/slices/secureStorage'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

type ApiError = {
  detail: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logout = async (dispatch: ThunkDispatch<unknown, unknown, any>) => {
  await removeSecureItems([
    SecureItemKey.cityPassAccessToken,
    SecureItemKey.cityPassRefreshToken,
    SecureItemKey.cityPasses,
  ])
  dispatch(deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassAccessToken))
  dispatch(deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassRefreshToken))
  dispatch(setIsCityPassOwnerRegistered(false))
  setTimeout(
    () =>
      dispatch(
        setAlertAction({
          variant: AlertVariant.warning,
          text: 'Je Stadspas gegevens zijn niet meer zichtbaar in de app. Je kunt je Stadspas gegevens altijd weer zien door in te loggen.',
          title: 'Uitgelogd',
          hasIcon: true,
          hasCloseIcon: true,
          testID: 'CityPassLoggedOutAlert',
        }),
      ),
    100,
  )
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
      return new Promise((resolve, reject) => {
        void getSecureTokens().then(({refreshToken}) => {
          if (refreshToken) {
            dispatch(
              cityPassApi.endpoints[CityPassEndpointName.refreshToken].initiate(
                refreshToken,
              ),
            )
              .unwrap()
              .then(
                ({access_token, refresh_token}) => {
                  setSecureTokens(access_token, refresh_token).then(
                    () => {
                      dispatch(
                        setSecureItemUpdatedTimestamp(
                          SecureItemKey.cityPassAccessToken,
                        ),
                      )
                      dispatch(
                        setSecureItemUpdatedTimestamp(
                          SecureItemKey.cityPassRefreshToken,
                        ),
                      )
                      devLog('Tokens successful refreshed')
                      failRetry('New tokens, so old request should fail')
                      resolve()
                    },
                    () => {
                      devError('refresh tokens save failed')
                      reject(new Error('New tokens could not be saved'))
                    },
                  )
                },
                async () => {
                  devError('Token refresh failed, you are now logged out')
                  await logout(dispatch)
                  failRetry('Session ended')
                  reject(new Error('Token refresh failed'))
                },
              )
          }
        })
      })
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
  useGetCityPassesQuery,
  useLogoutMutation,
} = cityPassApi
