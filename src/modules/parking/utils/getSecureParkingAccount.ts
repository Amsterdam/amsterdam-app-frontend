import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {devLog} from '@/processes/development'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const getSecureParkingAccount = async (
  accountReportCode: string,
  scope: ParkingPermitScope,
): Promise<SecureParkingAccount | undefined> => {
  try {
    const scopeAccounts = await getSecureItem(
      scope === ParkingPermitScope.permitHolder
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
      return (
        parsed as Array<SecureParkingAccount | null>
      ).find<SecureParkingAccount>(
        (item): item is SecureParkingAccount =>
          typeof item === 'object' &&
          item !== null &&
          'reportCode' in item &&
          item.reportCode === accountReportCode,
      )
    }

    return undefined
  } catch (e) {
    devLog(e)

    return Promise.reject(e)
  }
}
