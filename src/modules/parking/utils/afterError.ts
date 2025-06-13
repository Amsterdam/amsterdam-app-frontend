import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {type RootState} from '@/store/types/rootState'

export const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch, getState},
  failRetry,
) => {
  if (error?.status === 403) {
    const state = getState() as RootState
    const {currentAccountType} = state.parking

    return refreshAccessToken(
      currentAccountType,
      dispatch,
      state,
      failRetry,
    ).then(() => Promise.resolve())
  } else {
    failRetry('no access')
  }
}
