import {getAddressLine2, getAddressParam, getCoordinates} from './address'
import {AddressCity} from '@/modules/address'

describe('getAddressParam', () => {
  test('should return an undefined address and no coordinates when address is not provided', () => {
    const result = getAddressParam()
    expect(result).toEqual({address: undefined})
  })
  test('should return address query arg with addresLine1 when coordinates are not provided', () => {
    const result = getAddressParam({
      addressLine1: 'Hoofdstraat 123',
      addressLine2: '1234 AB AMSTERDAM',
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdstraat',
    })
    expect(result).toEqual({address: 'Hoofdstraat 123'})
  })
  test('should return address query arg with coordinates when provided', () => {
    const result = getAddressParam({
      addressLine1: 'Hoofdstraat 123',
      addressLine2: '1234 AB AMSTERDAM',
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      coordinates: {
        lat: 52.37403,
        lon: 4.88969,
      },
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdstraat',
    })
    expect(result).toEqual({
      lat: 52.37403,
      lon: 4.88969,
    })
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
