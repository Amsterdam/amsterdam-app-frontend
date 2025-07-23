import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {parkingSlice, useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

/**
 * Component to pre-render parking account information.
 * It retrieves the secure parking account and sets it in the Redux store.
 */
export const ParkingPreRenderComponent = () => {
  const dispatch = useDispatch()
  const account = useParkingAccount()

  const setParkingAccount = useCallback(async () => {
    let secureAccounts: string | null = null
    let scope: ParkingPermitScope | undefined

    secureAccounts = await getSecureItem(SecureItemKey.parkingPermitHolder)

    if (secureAccounts) {
      scope = ParkingPermitScope.permitHolder
    } else {
      secureAccounts = await getSecureItem(SecureItemKey.parkingVisitor)

      if (secureAccounts) {
        scope = ParkingPermitScope.visitor
      }
    }

    if (!secureAccounts || !scope) {
      return
    }

    let parsedSecureAccounts: unknown

    try {
      parsedSecureAccounts = JSON.parse(secureAccounts)
    } catch {
      parsedSecureAccounts = []
    }

    const firstSecureAccount =
      Array.isArray(parsedSecureAccounts) && parsedSecureAccounts.length
        ? (parsedSecureAccounts[0] as SecureParkingAccount)
        : undefined

    if (!firstSecureAccount) {
      return
    }

    dispatch(
      parkingSlice.actions.setCurrentAccount(firstSecureAccount.reportCode),
    )
    dispatch(
      parkingSlice.actions.setParkingAccount({
        reportCode: firstSecureAccount.reportCode,
        scope,
      }),
    )
  }, [dispatch])

  useEffect(() => {
    if (!account) {
      void setParkingAccount()
    }
  }, [account, setParkingAccount])

  return null
}
