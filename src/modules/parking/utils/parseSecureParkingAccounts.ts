import {SecureParkingAccount} from '@/modules/parking/types'

export const parseSecureParkingAccounts = (
  raw: string | null,
): SecureParkingAccount[] => {
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
