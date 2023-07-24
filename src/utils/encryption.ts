import CryptoJS from 'react-native-crypto-js'

type EncryptionParams = {
  password: string
  salt: string
}

export const encryptWithAES = ({password, salt}: EncryptionParams): string =>
  CryptoJS.AES.encrypt(salt, password).toString()

export const decryptWithAES = ({password, salt}: EncryptionParams): string => {
  const bytes = CryptoJS.AES.decrypt(salt, password)

  return bytes.toString(CryptoJS.enc.Utf8)
}
