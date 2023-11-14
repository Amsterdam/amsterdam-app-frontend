import AES from 'crypto-js/aes'
import SHA256 from 'crypto-js/sha256'

type EncryptionParams = {
  password: string
  salt: string
}

export const encryptWithAES = ({password, salt}: EncryptionParams): string =>
  AES.encrypt(salt, password).toString()

export const decryptWithAES = ({password, salt}: EncryptionParams): string => {
  const bytes = AES.decrypt(salt, password)

  return bytes.toString(CryptoJS.enc.Utf8)
}

export const encryptWithSHA256 = (value: string) => SHA256(value).toString()
