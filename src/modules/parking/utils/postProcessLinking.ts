import {PartialState, NavigationState} from '@react-navigation/native'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice, selectParkingAccounts} from '@/modules/parking/slice'
import {ParkingAccountLogin} from '@/modules/parking/types'
import {type RootState} from '@/store/types/rootState'

export const postProcessLinking = (
  state: PartialState<NavigationState>,
  dispatch?: ReduxDispatch,
  getState?: () => RootState,
  // eslint-disable-next-line sonarjs/no-invariant-returns
) => {
  if (!state || !dispatch || !getState) {
    return state
  }

  if (
    state?.routes?.some(
      (route: {
        name: string
        state?: {routes: Array<{name: string; params?: unknown}>}
      }) =>
        route.name === 'parking' &&
        route.state?.routes?.some(r => r.name === 'ParkingLogin'),
    )
  ) {
    const parkingRoute = state.routes.find(route => route.name === 'parking')
    const parkingLoginRoute = parkingRoute?.state?.routes.find(
      route => route.name === 'ParkingLogin',
    )

    dispatch(parkingSlice.actions.setIsLoggingIn(true))
    const params = parkingLoginRoute?.params as ParkingAccountLogin | undefined

    if (params) {
      dispatch(parkingSlice.actions.setDeeplinkAccount(params))
      const reportCode = params.reportCode
      const storeState = getState()

      const stateAccounts = selectParkingAccounts(storeState)

      const account = stateAccounts[reportCode]

      if (account) {
        dispatch(parkingSlice.actions.setCurrentAccount(reportCode))
        const permits = account.permits

        if (permits && permits.length > 0) {
          dispatch(
            parkingSlice.actions.setCurrentPermitReportCode(
              permits[0].report_code.toString(),
            ),
          )
        }

        dispatch(parkingApi.util.resetApiState())

        dispatch(parkingSlice.actions.setIsLoggingIn(false))
        dispatch(parkingSlice.actions.setDeeplinkAccount(undefined))
      }
    }
  }

  return state
}
