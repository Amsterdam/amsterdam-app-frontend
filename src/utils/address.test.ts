import {getAddressParam, getCoordinates} from './address'
import {AddressCity} from '@/modules/address'

describe('getAddressParam', () => {
  test('should return an undefined address and no coordinates when address is not provided', () => {
    const result = getAddressParam()
    expect(result).toEqual({address: undefined})
  })
  test('should return address query arg with shortAddress when coordinates are not provided', () => {
    const address = {
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      number: 123,
      postcode: '1234 AB',
      shortAddress: 'Hoofdstraat 123',
      street: 'Hoofdstraat',
    }
    // @ts-ignore
    const result = getAddressParam(address)
    expect(result).toEqual({address: 'Hoofdstraat 123'})
  })
  test('should return address query arg with coordinates when provided', () => {
    const address = {
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      coordinates: {
        lat: 52.37403,
        lon: 4.88969,
      },
      number: 123,
      postcode: '1234 AB',
      shortAddress: 'Hoofdstraat 123',
      street: 'Hoofdstraat',
    }
    const result = getAddressParam(address)
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
