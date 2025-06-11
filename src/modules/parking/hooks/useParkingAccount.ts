import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {parkingSlice} from '@/modules/parking/slice'
import {ParkingStateCurrentAccount} from '@/modules/parking/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export const useParkingAccount = () => {
  const dispatch = useDispatch()
  const parkingAccount = useSelector(
    (state: RootState) => state[ReduxKey.parking].parkingAccount,
  )
  const updateParkingAccount = useCallback(
    (data: ParkingStateCurrentAccount) => {
      dispatch(parkingSlice.actions.updateParkingAccount(data))
    },
    [dispatch],
  )

  return {parkingAccount, updateParkingAccount}
}
