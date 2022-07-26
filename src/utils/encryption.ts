import CryptoJS from 'react-native-crypto-js'

type EncryptionParams = {
  password: string
  salt: string
}

export const encryptWithAES = ({password, salt}: EncryptionParams): string => {
  const ciphertext = CryptoJS.AES.encrypt(salt, password).toString()
  return ciphertext
}

export const decryptWithAES = ({password, salt}: EncryptionParams): string => {
  const bytes = CryptoJS.AES.decrypt(salt, password)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
