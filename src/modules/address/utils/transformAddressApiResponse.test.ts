import {Address, AddressCity, PdokAddress} from '@/modules/address/types'
import {
  getAddition,
  getAddressLine1,
  getAddressLine2,
  getCoordinates,
  transformAddressApiResponse,
} from '@/modules/address/utils/transformAddressApiResponse'

describe('getAddition', () => {
  test('should return the correct addition when only bag_huisletter is provided', () => {
    expect(getAddition('B', '')).toBe('B')
  })
  test('should return the correct addition when only bag_toevoeging is provided', () => {
    expect(getAddition('', '3')).toBe('3')
  })
  test('should return undefined when both bag_huisletter and bag_toevoeging are not provided', () => {
    expect(getAddition('', '')).toBeUndefined()
  })
})

describe('getAddressLine1', () => {
  test('should format postcode and city into address line 2', () => {
    expect(
      getAddressLine1({
        huisletter: 'A',
        huisnummer: 123,
        straatnaam: 'Hoofdweg',
      }),
    ).toBe('Hoofdweg 123A')
  })
  test('should undefined input', () => {
    // @ts-ignore
    expect(getAddressLine1({})).toBe('')
    // @ts-ignore
    expect(getAddressLine1(undefined)).toBe('')
    // @ts-ignore
    expect(getAddressLine1()).toBe('')
  })
})

describe('getAddressLine2', () => {
  test('should format postcode and city into address line 2', () => {
    expect(getAddressLine2('1234AB', AddressCity.Amsterdam)).toBe(
      '1234 AB AMSTERDAM',
    )
    expect(getAddressLine2('5678CD', AddressCity.Weesp)).toBe('5678 CD WEESP')
  })
  test('should undefined input', () => {
    // @ts-ignore
    expect(getAddressLine2('5678CD')).toBe('')
    // @ts-ignore
    expect(getAddressLine2(undefined, AddressCity.Weesp)).toBe('')
    // @ts-ignore
    expect(getAddressLine2()).toBe('')
  })
})

describe('getCoordinates', () => {
  test('should parse centroid when provided', () => {
    expect(getCoordinates('POINT(4.88969 52.37403)')).toEqual({
      lat: 52.37403,
      lon: 4.88969,
    })
  })
  test('should return undefined when invalid centroid is provided', () => {
    // @ts-ignore
    expect(getCoordinates('')).toBe(undefined)
    // @ts-ignore
    expect(getCoordinates()).toBe(undefined)
    // @ts-ignore
    expect(getCoordinates(undefined)).toBe(undefined)
  })
})

describe('transformAddressApiResponse', () => {
  test('should transform the address API response into the correct address format, with letter addition', () => {
    const addressApiResponse = {
      id: '123',
      centroide_ll: 'POINT(4.85284154 52.36303093)',
      huisletter: 'A',
      huisnummer: 123,
      nummeraanduiding_id: '0363200000132941',
      postcode: '1058BB',
      score: 6.84586,
      straatnaam: 'Hoofdweg',
      type: 'adres',
      weergavenaam: 'Hoofdweg 123A, 1058BB Amsterdam',
      woonplaatsnaam: 'Amsterdam',
    } as PdokAddress
    const expectedAddress: Address = {
      addition: 'A',
      additionLetter: 'A',
      addressLine1: 'Hoofdweg 123A',
      addressLine2: '1058 BB AMSTERDAM',
      bagId: '0363200000132941',
      city: AddressCity.Amsterdam,
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      number: 123,
      postcode: '1058BB',
      street: 'Hoofdweg',
    }

    expect(transformAddressApiResponse(addressApiResponse)).toEqual(
      expectedAddress,
    )
  })
  test('should transform the address API response into the correct address format, with number addition', () => {
    const addressApiResponse = {
      id: '123',
      centroide_ll: 'POINT(4.85284154 52.36303093)',
      huisnummertoevoeging: '4',
      huisnummer: 123,
      nummeraanduiding_id: '0363200000132941',
      postcode: '1058BB',
      score: 6.84586,
      straatnaam: 'Hoofdweg',
      type: 'adres',
      weergavenaam: 'Hoofdweg 123A, 1058BB Amsterdam',
      woonplaatsnaam: 'Amsterdam',
    } as PdokAddress
    const expectedAddress: Address = {
      addition: '4',
      additionNumber: '4',
      addressLine1: 'Hoofdweg 123-4',
      addressLine2: '1058 BB AMSTERDAM',
      bagId: '0363200000132941',
      city: AddressCity.Amsterdam,
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      number: 123,
      postcode: '1058BB',
      street: 'Hoofdweg',
    }

    expect(transformAddressApiResponse(addressApiResponse)).toEqual(
      expectedAddress,
    )
  })
})
