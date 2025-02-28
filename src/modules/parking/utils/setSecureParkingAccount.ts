import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {setSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const setSecureParkingAccount = async (
  account: SecureParkingAccount,
) => {
  try {
    return await setSecureItem(
      account.scope === ParkingPermitScope.permitHolder
        ? SecureItemKey.parkingPermitHolder
        : SecureItemKey.parkingVisitor,
      JSON.stringify(account),
    )
  } catch (e) {
    return e
  }
}
