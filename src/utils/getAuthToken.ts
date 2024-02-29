import {AUTH_PASSWORD, AUTH_SHARED_SECRET} from '@env'
import {encryptWithAES} from '@/utils/encryption'

export const getAuthToken = (data = ''): string =>
  encryptWithAES({
    password: AUTH_PASSWORD ?? '',
    data,
  })

export const deviceAuthorizationToken = getAuthToken(AUTH_SHARED_SECRET)
