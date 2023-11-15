import {AES, SHA256, enc} from 'crypto-js'
// eslint-disable-next-line no-restricted-imports
import {getUniqueId} from 'react-native-device-info'

type EncryptionParams = {
  password: string
  salt: string
}

export const encryptWithAES = ({password, salt}: EncryptionParams): string =>
  AES.encrypt(salt, password).toString()

export const decryptWithAES = ({password, salt}: EncryptionParams): string => {
  const bytes = AES.decrypt(salt, password)

  return bytes.toString(enc.Utf8)
}

export const encryptWithSHA256 = (value: string) => SHA256(value).toString()

export const ENCRYPTED_UNIQUE_ID = encryptWithSHA256(getUniqueId())
