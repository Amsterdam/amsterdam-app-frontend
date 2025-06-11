import {
  ParkingPermitScope,
  ParkingStateCurrentAccount,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {devLog} from '@/processes/development'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const getSecureParkingAccount = async (
  account: ParkingStateCurrentAccount,
): Promise<SecureParkingAccount | undefined> => {
  try {
    const scopeAccounts = await getSecureItem(
      account.scope === ParkingPermitScope.permitHolder
        ? SecureItemKey.parkingPermitHolder
        : SecureItemKey.parkingVisitor,
    )

    if (!scopeAccounts) {
      return undefined
    }

    let parsed: unknown

    try {
      parsed = JSON.parse(scopeAccounts)
    } catch {
      parsed = []
    }

    if (Array.isArray(parsed)) {
      // Find the account with the matching reportCode
      return (parsed as SecureParkingAccount[]).find(
        item =>
          typeof item === 'object' &&
          item !== null &&
          'reportCode' in item &&
          item.reportCode === account.reportCode,
      )
    }

    return undefined
  } catch (e) {
    devLog(e)

    return Promise.reject(e)
  }
}
