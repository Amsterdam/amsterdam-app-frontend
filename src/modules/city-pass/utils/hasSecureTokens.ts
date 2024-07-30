import {devLog} from '@/processes/development'
import {isSetSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const hasSecureTokens = async () => {
  try {
    const isSetAccessToken = await isSetSecureItem(
      SecureItemKey.cityPassAccessToken,
    )
    const isSetRefreshToken = await isSetSecureItem(
      SecureItemKey.cityPassRefreshToken,
    )

    return isSetAccessToken && isSetRefreshToken
  } catch (e) {
    devLog(e)
  }
}
