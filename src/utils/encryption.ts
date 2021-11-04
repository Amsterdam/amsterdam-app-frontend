const CryptoJS = require('react-native-crypto-js') // require because no types-declaration file present

type EncryptionParams = {
  password: string
  plaintext: string
}

export const encryptWithAES = ({password, plaintext}: EncryptionParams) => {
  let ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString()
  return ciphertext
}

export const decryptWithAES = ({password, plaintext}: EncryptionParams) => {
  let bytes = CryptoJS.AES.decrypt(plaintext, password)
  let originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
