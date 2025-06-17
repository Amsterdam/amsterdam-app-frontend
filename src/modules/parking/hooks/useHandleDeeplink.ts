import {useEffect} from 'react'
import {RouteProp} from '@/app/navigation/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/parking/alerts'
import {ParkingRouteName} from '@/modules/parking/routes'
import {setIsWaitingForWalletBalanceIncrease} from '@/modules/parking/slice'
import {baseApi} from '@/services/baseApi'
import {useAlert} from '@/store/slices/alert'

export const useHandleDeeplink = (
  route: RouteProp<ParkingRouteName.dashboard>,
) => {
  const {params} = route
  const {setAlert} = useAlert()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.action === 'increase-balance') {
      if (params.status === 'COMPLETED') {
        setAlert(alerts.increaseBalanceSuccess)
        dispatch(setIsWaitingForWalletBalanceIncrease(true))
        dispatch(baseApi.util.invalidateTags(['ParkingAccount']))
      } else if (params.status === 'EXPIRED' || params.status === 'CANCELLED') {
        setAlert(alerts.increaseBalanceFailed)
      }
    } else if (params?.action === 'start-session-and-increase-balance') {
      if (params.status === 'COMPLETED') {
        setAlert(alerts.startSessionSuccess)
        dispatch(
          baseApi.util.invalidateTags(['ParkingAccount', 'ParkingSessions']),
        )
      } else if (params.status === 'EXPIRED' || params.status === 'CANCELLED') {
        setAlert(alerts.increaseBalanceFailed)
      }
    }
  }, [dispatch, params, setAlert])
}
