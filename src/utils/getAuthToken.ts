import {encryptWithAES} from './encryption'

export const getAuthToken = (salt: string = '') =>
  encryptWithAES({
    password: process.env.AUTH_PASSWORD ?? '',
    salt,
  })

export const deviceAuthorizationToken = getAuthToken(
  process.env.AUTH_SHARED_SECRET,
)
