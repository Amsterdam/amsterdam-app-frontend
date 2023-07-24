import {
  getAddition,
  getAddressLine2,
  getCoordinates,
  transformAddressApiResponse,
} from './transformAddressApiResponse'
import {Address, AddressCity, ApiAddress} from '@/modules/address/types'

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
  const coordinates = {
    lat: 52.37403,
    lon: 4.88969,
  }

  test('should return coordinates when provided', () => {
    expect(getCoordinates([4.88969, 52.37403], coordinates)).toEqual(
      coordinates,
    )
    expect(getCoordinates(undefined, coordinates)).toEqual(coordinates)
  })
  test('should return centroid as coordinates when coordinates are not provided', () => {
    expect(getCoordinates([4.88969, 52.37403])).toEqual({
      lat: 52.37403,
      lon: 4.88969,
    })
  })
  test('should return undefined when neither centroid nor coordinates are provided', () => {
    expect(getCoordinates()).toBe(undefined)
  })
})

describe('transformAddressApiResponse', () => {
  test('should transform the address API response into the correct address format, with letter addition', () => {
    const addressApiResponse = {
      _display: 'Hoofdweg 123-A, Amsterdam',
      adres: 'Hoofdweg 123-A',
      bag_huisletter: 'A',
      bag_toevoeging: '',
      centroid: [52.123456, 4.56789],
      coordinates: {lat: 52.123456, lon: 4.56789},
      huisnummer: 123,
      landelijk_id: 'landelijk-id-123',
      postcode: '1234AB',
      straatnaam: 'Hoofdweg',
      toevoeging: '',
      woonplaats: AddressCity.Amsterdam,
    } as ApiAddress
    const expectedAddress: Address = {
      addition: 'A',
      additionLetter: 'A',
      addressLine1: 'Hoofdweg 123-A',
      addressLine2: '1234 AB AMSTERDAM',
      bagId: 'landelijk-id-123',
      city: AddressCity.Amsterdam,
      coordinates: {lat: 52.123456, lon: 4.56789},
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdweg',
    }

    expect(transformAddressApiResponse(addressApiResponse)).toEqual(
      expectedAddress,
    )
  })
  test('should transform the address API response into the correct address format, with number addition', () => {
    const addressApiResponse = {
      _display: 'Hoofdweg 123-4, Amsterdam',
      adres: 'Hoofdweg 123-4',
      bag_huisletter: '',
      bag_toevoeging: '4',
      centroid: [52.123456, 4.56789],
      coordinates: {lat: 52.123456, lon: 4.56789},
      huisnummer: 123,
      landelijk_id: 'landelijk-id-123',
      postcode: '1234AB',
      straatnaam: 'Hoofdweg',
      toevoeging: '',
      woonplaats: AddressCity.Amsterdam,
    } as ApiAddress
    const expectedAddress: Address = {
      addition: '4',
      additionNumber: '4',
      addressLine1: 'Hoofdweg 123-4',
      addressLine2: '1234 AB AMSTERDAM',
      bagId: 'landelijk-id-123',
      city: AddressCity.Amsterdam,
      coordinates: {lat: 52.123456, lon: 4.56789},
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdweg',
    }

    expect(transformAddressApiResponse(addressApiResponse)).toEqual(
      expectedAddress,
    )
  })
})
