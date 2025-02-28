import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {devLog} from '@/processes/development'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const getSecureParkingAccount = async (
  accountType: ParkingPermitScope,
) => {
  try {
    const account = await getSecureItem(
      accountType === ParkingPermitScope.permitHolder
        ? SecureItemKey.parkingPermitHolder
        : SecureItemKey.parkingVisitor,
    )

    return account ? (JSON.parse(account) as SecureParkingAccount) : undefined
  } catch (e) {
    devLog(e)

    return Promise.reject(e)
  }
}
