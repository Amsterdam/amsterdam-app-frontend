import {useEffect, useState} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAccountDetailsQuery} from '@/modules/parking/service'
import {useParkingAccount, parkingSlice} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const useSetParkingAccountName = (skip?: boolean) => {
  const dispatch = useDispatch()
  const [isSetAccountName, setIsSetAccountName] = useState(false)
  const parkingAccount = useParkingAccount()
  const accountDetails = useAccountDetailsQuery(undefined, {
    skip:
      skip ||
      !parkingAccount ||
      !!parkingAccount?.name ||
      parkingAccount?.scope === ParkingPermitScope.visitor,
  }).data

  useEffect(() => {
    if (!parkingAccount || !accountDetails || isSetAccountName) {
      return
    }

    const {initials, last_name} = accountDetails

    if (!initials && !last_name) {
      return
    }

    dispatch(
      parkingSlice.actions.setParkingAccount({
        ...parkingAccount,
        name: [initials, last_name].filter(Boolean).join(' '),
      }),
    )
    setIsSetAccountName(true)
  }, [accountDetails, dispatch, isSetAccountName, parkingAccount])
}
