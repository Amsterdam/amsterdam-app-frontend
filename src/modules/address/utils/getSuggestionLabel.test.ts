import {PdokAddress} from '../types'
import {
  getSuggestionLabel,
  getSuggestionLabelForNumber,
  getSuggestionLabelForStreet,
} from './getSuggestionLabel'

describe('getSuggestionLabelForStreet', () => {
  it('should return straatnaam when type is "weg" and woonplaatsnaam is "Amsterdam"', () => {
    const pdokAddress = {
      straatnaam: 'Amstel',
      type: 'weg',
      woonplaatsnaam: 'Amsterdam',
    } as PdokAddress

    const result = getSuggestionLabelForStreet(pdokAddress)

    expect(result).toBe('Amstel')
  })

  it('should return "straatnaam, woonplaatsnaam" when type is "weg" and woonplaatsnaam is not "Amsterdam"', () => {
    const pdokAddress = {
      straatnaam: 'Stationsplein',
      type: 'weg',
      woonplaatsnaam: 'Weesp',
    } as unknown as PdokAddress

    const result = getSuggestionLabelForStreet(pdokAddress)

    expect(result).toBe('Stationsplein, Weesp')
  })

  it('should return streetAndHouseNumber when type is not "weg" and woonplaatsnaam is "Amsterdam"', () => {
    const pdokAddress = {
      huisnummer: '1',
      straatnaam: 'Amstel',
      type: 'adres',
      woonplaatsnaam: 'Amsterdam',
    } as unknown as PdokAddress

    const result = getSuggestionLabelForStreet(pdokAddress)

    expect(result).toBe('Amstel 1')
  })

  it('should return "streetAndHouseNumber, woonplaatsnaam" when type is not "weg" and woonplaatsnaam is not "Amsterdam"', () => {
    const pdokAddress = {
      huisnummer: 1,
      straatnaam: 'Stationsplein',
      type: 'adres',
      woonplaatsnaam: 'Weesp',
    } as unknown as PdokAddress

    const result = getSuggestionLabelForStreet(pdokAddress)

    expect(result).toBe('Stationsplein 1, Weesp')
  })
})

describe('getSuggestionLabelForNumber', () => {
  it('should return the correct suggestion label for number with minimal fields', () => {
    const pdokAddress = {
      huisnummer: 123,
    } as PdokAddress

    const result = getSuggestionLabelForNumber(pdokAddress)

    expect(result).toBe('123')
  })

  it('should return the correct suggestion label for number with additions', () => {
    const pdokAddress1 = {
      huisnummer: 123,
      huisletter: 'A',
    } as PdokAddress
    const pdokAddress2 = {
      huisnummer: 123,
      huisnummertoevoeging: '4',
    } as PdokAddress

    const result1 = getSuggestionLabelForNumber(pdokAddress1)
    const result2 = getSuggestionLabelForNumber(pdokAddress2)

    expect(result1).toBe('123A')
    expect(result2).toBe('123-4')
  })
})

describe('getSuggestionLabel', () => {
  it('should call getSuggestionLabelForNumber when numbersOnly is true', () => {
    const pdokAddress = {
      huisnummer: 123,
    } as PdokAddress
    const numbersOnly = true

    const result = getSuggestionLabel(pdokAddress, numbersOnly)

    expect(result).toBe('123')
  })

  it('should call getSuggestionLabelForStreet when numbersOnly is false', () => {
    const pdokAddress = {
      straatnaam: 'Amstel',
      type: 'weg',
      woonplaatsnaam: 'Amsterdam',
    } as PdokAddress
    const numbersOnly = false

    const result = getSuggestionLabel(pdokAddress, numbersOnly)

    expect(result).toBe('Amstel')
  })
})
