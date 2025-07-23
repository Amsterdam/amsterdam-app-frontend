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
    const parseAccounts = (raw: string | null): SecureParkingAccount[] => {
      if (!raw) {
        return []
      }

      try {
        const parsed: unknown = JSON.parse(raw)

        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is SecureParkingAccount =>
              typeof item === 'object' && item !== null && 'reportCode' in item,
          )
        }
      } catch {
        // ignore parse error
      }

      return []
    }

    const permitHolderRaw = await getSecureItem(
      SecureItemKey.parkingPermitHolder,
    )
    const visitorRaw = await getSecureItem(SecureItemKey.parkingVisitor)

    const permitHolders = parseAccounts(permitHolderRaw)
    const visitors = parseAccounts(visitorRaw)

    const dispatchAccounts = (
      accounts: SecureParkingAccount[],
      scope: ParkingPermitScope,
    ) => {
      accounts.forEach(a => {
        dispatch(
          parkingSlice.actions.setParkingAccount({
            reportCode: a.reportCode,
            scope,
          }),
        )
      })
    }

    dispatchAccounts(permitHolders, ParkingPermitScope.permitHolder)
    dispatchAccounts(visitors, ParkingPermitScope.visitor)

    const currentAccount = permitHolders[0] ?? visitors[0]

    if (currentAccount) {
      dispatch(
        parkingSlice.actions.setCurrentAccount(currentAccount.reportCode),
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (!account) {
      void setParkingAccount()
    }
  }, [account, setParkingAccount])

  return null
}
