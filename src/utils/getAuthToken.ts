import {encryptWithAES} from '.'

export const getAuthToken = (plaintext: string = '') => {
  return encryptWithAES({
    password: process.env.AUTH_PASSWORD ?? '',
    plaintext,
  })
}
