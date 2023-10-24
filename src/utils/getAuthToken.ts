import {AUTH_PASSWORD, AUTH_SHARED_SECRET} from '@env'
import {encryptWithAES} from '@/utils/encryption'

export const getAuthToken = (salt = ''): string =>
  encryptWithAES({
    password: AUTH_PASSWORD ?? '',
    salt,
  })

export const deviceAuthorizationToken = getAuthToken(AUTH_SHARED_SECRET)
