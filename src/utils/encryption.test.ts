import {decryptWithAES, encryptWithAES} from './encryption'

describe('AES', () => {
  test('encrypt and decrypt', () => {
    const password = 'some password'
    const data = 'some data'

    expect(
      decryptWithAES({data: encryptWithAES({password, data}), password}),
    ).toEqual(data)
  })
})
