import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {RootState} from '@/store/types/rootState'

export const afterError: AfterBaseQueryErrorFn = async (
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
