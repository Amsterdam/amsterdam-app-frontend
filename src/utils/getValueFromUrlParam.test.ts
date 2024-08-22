import {getValueFromUrlParam} from '@/utils/getValueFromUrlParam'

describe('getValueFromUrlParam', () => {
  let url =
    'stadspas?errorMessage=Verzenden%20van%20administratienummer%20naar%20de%20Amsterdam%20app%20niet%20gelukt&errorCode=004'

  it('should return the value of the key from the URL', () => {
    const key = 'errorMessage'

    expect(getValueFromUrlParam(url, key)).toBe(
      'Verzenden van administratienummer naar de Amsterdam app niet gelukt',
    )
  })

  it('should return null if the key is not present in the URL', () => {
    const key = 'key3'

    expect(getValueFromUrlParam(url, key)).toBeNull()
  })

  it('should return null if the url is null or undefined', () => {
    url = null as unknown as string
    const key = 'key1'

    expect(getValueFromUrlParam(url, key)).toBeNull()
  })

  it('should return null if the key is null or undefined', () => {
    const key = null as unknown as string

    expect(getValueFromUrlParam(url, key)).toBeNull()
  })
})
