import {encryptWithAES} from './'

export const getAuthToken = (salt: string = '') => {
  console.log(salt)
  return encryptWithAES({
    password: process.env.AUTH_PASSWORD ?? '',
    salt,
  })
}

export const deviceAuthorizationToken = getAuthToken(
  process.env.AUTH_SHARED_SECRET,
)
