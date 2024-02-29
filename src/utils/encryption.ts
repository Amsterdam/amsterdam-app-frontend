/* Importing react-native-get-random-values fixes the error "Native crypto module could not be used to get secure random number."
 * It seems to be required when using crypto-js with RN; see https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values'
import {AES, SHA256, enc} from 'crypto-js'
// eslint-disable-next-line no-restricted-imports
import {getUniqueIdSync} from 'react-native-device-info'

type EncryptionParams = {
  data: string
  password: string
}

export const encryptWithAES = ({password, data}: EncryptionParams): string =>
  AES.encrypt(data, password).toString()

export const decryptWithAES = ({password, data}: EncryptionParams): string => {
  const bytes = AES.decrypt(data, password)

  return bytes.toString(enc.Utf8)
}

export const encryptWithSHA256 = (value: string) => SHA256(value).toString()

export const SHA256EncryptedDeviceId = encryptWithSHA256(getUniqueIdSync())
