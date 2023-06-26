import {persistedStateTransformers} from './persistedStateTransformers'
import {AddressCity} from './types'

describe('transform function for old address', () => {
  test('should transform old address state to the new one', () => {
    expect(
      persistedStateTransformers[0].transform({
        adres: 'Hoofdstraat 123',
        bagNummeraanduidingId: '1234567890',
        bag_huisletter: 'A',
        bag_toevoeging: '2',
        centroid: [52.37403, 4.88969],
        coordinates: {
          lat: 52.37403,
          lon: 4.88969,
        },
        huisnummer: 123,
        postcode: '1234 AB',
        straatnaam: 'Hoofdstraat',
        woonplaats: AddressCity.Amsterdam,
      }),
    ).toEqual({
      address: {
        addition: '2',
        addressText: 'Hoofdstraat 123',
        bagId: '1234567890',
        city: AddressCity.Amsterdam,
        coordinates: {
          lat: 52.37403,
          lon: 4.88969,
        },
        number: 123,
        postcode: '1234 AB',
        street: 'Hoofdstraat',
      },
    })
  })
})
