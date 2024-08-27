import {devLog} from '@/processes/development'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const getSecureTokens = async (): Promise<{
  accessToken: string | null
  refreshToken: string | null
}> => {
  try {
    const accessToken = await getSecureItem(SecureItemKey.cityPassAccessToken)
    const refreshToken = await getSecureItem(SecureItemKey.cityPassRefreshToken)

    return {accessToken, refreshToken}
  } catch (e) {
    devLog(e)

    return Promise.reject(e)
  }
}
