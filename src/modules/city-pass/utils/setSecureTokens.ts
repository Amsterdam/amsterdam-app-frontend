import {setSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const setSecureTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    const accessTokenSet = await setSecureItem(
      SecureItemKey.cityPassAccessToken,
      accessToken,
    )
    const refreshTokenSet = await setSecureItem(
      SecureItemKey.cityPassRefreshToken,
      refreshToken,
    )

    return {accessTokenSet, refreshTokenSet}
  } catch (e) {
    return e
  }
}
