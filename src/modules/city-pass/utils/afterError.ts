import {
  CityPassApiError,
  CityPassError401Codes,
} from '@/modules/city-pass/types'
import {logout} from '@/modules/city-pass/utils/logout'
import {refreshTokens} from '@/modules/city-pass/utils/refreshTokens'
import {AfterBaseQueryErrorFn} from '@/services/types'

/**
 * Removes a token that causes the backend to return a 403 forbidden error
 */
export const afterError: AfterBaseQueryErrorFn = async (
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
