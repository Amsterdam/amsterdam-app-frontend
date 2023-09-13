import {getNotFoundText} from './getNotFoundText'
import {Address} from '@/modules/address/types'

describe('getNotFoundText', () => {
  it('should return a sensible not found text when address and locationType are not provided (should not happen)', () => {
    const result = getNotFoundText()

    expect(result).toBe(
      'We hebben geen afvalinformatie gevonden voor deze locatie.',
    )
  })

  it('should return a sensible not found text when locationType is not provided (should not happen)', () => {
    const address = {
      city: 'Amsterdam',
    } as Address
    const result = getNotFoundText(address)

    expect(result).toBe(
      'We hebben geen afvalinformatie gevonden voor deze locatie in Amsterdam.',
    )
  })

  it('should return a sensible not found text when address has no city specified (should not happen)', () => {
    const address = {} as Address
    const result = getNotFoundText(address, 'location')

    expect(result).toBe(
      'We hebben geen afvalinformatie gevonden voor deze locatie.',
    )
  })

  it('should return the correct not found text when locationType is "address" and city is specified', () => {
    const address = {
      city: 'Amsterdam',
    } as Address
    const result = getNotFoundText(address, 'address')

    expect(result).toBe(
      'We hebben geen afvalinformatie gevonden voor dit adres in Amsterdam.',
    )
  })

  it('should return the correct not found text when locationType is "location" and city is specified', () => {
    const address = {
      city: 'Amsterdam',
    } as Address
    const result = getNotFoundText(address, 'location')

    expect(result).toBe(
      'We hebben geen afvalinformatie gevonden voor deze locatie in Amsterdam.',
    )
  })
})
