const CryptoJS = require('react-native-crypto-js') // require because no types-declaration file present

type EncrypterParams = {
  mode: 'encrypt' | 'decrypt'
  password: string
  plaintext: string
}

export const encrypter = ({mode, password, plaintext}: EncrypterParams) => {
  if (mode === 'encrypt') {
    let ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString()
    return ciphertext
  }

  if (mode === 'decrypt') {
    let bytes = CryptoJS.AES.decrypt(plaintext, password)
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  }
}
