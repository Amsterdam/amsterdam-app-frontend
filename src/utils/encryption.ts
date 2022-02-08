const CryptoJS = require('react-native-crypto-js') // require because no types-declaration file present

type EncryptionParams = {
  password: string
  salt: string
}

export const encryptWithAES = ({password, salt}: EncryptionParams) => {
  let ciphertext = CryptoJS.AES.encrypt(salt, password).toString()
  return ciphertext
}

export const decryptWithAES = ({password, salt}: EncryptionParams) => {
  let bytes = CryptoJS.AES.decrypt(salt, password)
  let originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
