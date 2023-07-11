import {PersistedState} from 'redux-persist'
import {migrations} from './migrations'
import {AddressCity} from '@/modules/address/types'

describe('transform function for old address', () => {
  test('should transform old address state to the new one (with letter addition)', () => {
    expect(
      migrations[0]({
        adres: 'Hoofdstraat 123-b',
        bagNummeraanduidingId: '1234567890',
        bag_huisletter: 'b',
        bag_toevoeging: '',
        centroid: [52.37403, 4.88969],
        coordinates: {
          lat: 52.37403,
          lon: 4.88969,
        },
        huisnummer: 123,
        postcode: '1234AB',
        straatnaam: 'Hoofdstraat',
        woonplaats: AddressCity.Amsterdam,
      } as unknown as PersistedState),
    ).toEqual({
      address: {
        addition: 'b',
        addressLine1: 'Hoofdstraat 123-b',
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
      },
    })
  })
  test('should transform old address state to the new one (with number addition)', () => {
    expect(
      migrations[0]({
        adres: 'Hoofdstraat 123-2',
        bagNummeraanduidingId: '1234567890',
        bag_huisletter: '',
        bag_toevoeging: '2',
        centroid: [52.37403, 4.88969],
        coordinates: {
          lat: 52.37403,
          lon: 4.88969,
        },
        huisnummer: 123,
        postcode: '1234AB',
        straatnaam: 'Hoofdstraat',
        woonplaats: AddressCity.Amsterdam,
      } as unknown as PersistedState),
    ).toEqual({
      address: {
        addition: '2',
        addressLine1: 'Hoofdstraat 123-2',
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
      },
    })
  })
})

describe('transform function for adding addition letter and number', () => {
  test('should transform old address with letter addition', () => {
    expect(
      migrations[1]({
        address: {
          addition: 'b',
          addressLine1: 'Hoofdstraat 123-b',
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
        },
      } as unknown as PersistedState),
    ).toEqual({
      address: {
        addition: 'b',
        additionLetter: 'b',
        addressLine1: 'Hoofdstraat 123-b',
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
      },
    })
  })
  test('should transform old address with number addition', () => {
    expect(
      migrations[1]({
        address: {
          addition: '2',
          addressLine1: 'Hoofdstraat 123-2',
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
        },
      } as unknown as PersistedState),
    ).toEqual({
      address: {
        addition: '2',
        additionNumber: '2',
        addressLine1: 'Hoofdstraat 123-2',
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
      },
    })
  })
})
