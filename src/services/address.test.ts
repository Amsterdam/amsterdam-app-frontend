import {transformAddressApiResponse} from './address'
import {Address, AddressCity, ApiAddress} from '@/modules/address/types'

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
