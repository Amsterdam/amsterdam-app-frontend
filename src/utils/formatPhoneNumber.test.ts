import {formatPhoneNumber} from './formatPhoneNumber'

describe('formatPhoneNumber', () => {
  it('formats a mobile phone number', () => {
    expect(formatPhoneNumber('0612345678')).toEqual('06 12 34 56 78')
  })
  it('formats a landline number for Amsterdam', () => {
    expect(formatPhoneNumber('0201234567')).toEqual('020 123 4567')
  })
  it('formats a landline number for Texel', () => {
    expect(formatPhoneNumber('0222222222')).toEqual('0222 222 222')
  })
  it('formats a landline number for Utrecht', () => {
    expect(formatPhoneNumber('0301234567')).toEqual('030 123 4567')
  })
  it('formats a landline number for Weesp', () => {
    expect(formatPhoneNumber('0294123456')).toEqual('0294 123 456')
  })
  it('formats eight-digit 0900- and 0800-numbers', () => {
    expect(formatPhoneNumber('08001234')).toEqual('0800 1234')
  })
  it('formats eleven-digit 0900- and 0800-numbers', () => {
    expect(formatPhoneNumber('09001234567')).toEqual('0900 123 4567')
  })
  it('formats the City’s internal service number', () => {
    expect(formatPhoneNumber('0202515020')).toEqual('020 25 15 020')
  })
  it('formats the City’s general information number', () => {
    expect(formatPhoneNumber('14020')).toEqual('14 020')
  })
  it('returns an incorrect number', () => {
    expect(formatPhoneNumber('123456789')).toEqual('123456789')
  })
  it('returns a text string', () => {
    expect(formatPhoneNumber('phone number')).toEqual('phone number')
  })
})
