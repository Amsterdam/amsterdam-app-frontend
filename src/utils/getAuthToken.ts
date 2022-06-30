import {encryptWithAES} from './'

export const getAuthToken = (salt: string = '') => {
  return encryptWithAES({
    password: process.env.AUTH_PASSWORD ?? '',
    salt,
  })
}

export const deviceAuthorizationToken = getAuthToken(
  process.env.AUTH_SHARED_SECRET,
)
