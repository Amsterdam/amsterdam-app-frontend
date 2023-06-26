import {
  Address,
  ApiAddress,
  BagResponse,
  ResponseAddress,
} from '@/modules/address/types'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types'
import {generateRequestUrl} from '@/utils'
import {getAddition, getAddressLine2, getCoordinates} from '@/utils/address'

const addressPath = '/search/adres/'
const bagPath = '/typeahead/bag/'

type AddresParams = {
  address: string
  city: Address['city']
}

export const transformAddressApiResponse = (address: ApiAddress): Address => {
  const {
    adres,
    bag_huisletter,
    bag_toevoeging,
    centroid,
    coordinates,
    huisnummer,
    landelijk_id,
    postcode,
    straatnaam,
    woonplaats,
  } = address

  return {
    addition: getAddition(bag_huisletter, bag_toevoeging),
    bagId: landelijk_id,
    city: woonplaats,
    coordinates: getCoordinates(centroid, coordinates),
    number: huisnummer,
    postcode,
    addressLine1: adres,
    addressLine2: getAddressLine2(postcode, woonplaats),
    street: straatnaam,
  }
}

export const addressApi = baseApi.injectEndpoints({
  endpoints: ({query}) => ({
    getAddress: query<Address, AddresParams>({
      query: ({address}) => ({
        url: generateRequestUrl({
          params: {features: 2, q: address},
          path: addressPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
      transformResponse: ({results}: ResponseAddress, _meta, {city}) => {
        const address = results.find(r => r.woonplaats === city) ?? results[0]

        return transformAddressApiResponse(address)
      },
    }),
    getBag: query<BagResponse | undefined, string>({
      query: address => ({
        url: generateRequestUrl({
          params: {features: 2, q: address},
          path: bagPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
      transformResponse: (bagResponse: BagResponse[]) =>
        bagResponse?.find(
          ({label}) => label === 'Adressen' || label === 'Straatnamen',
        ),
    }),
  }),
  overrideExisting: true,
})

export const {useGetAddressQuery, useGetBagQuery} = addressApi
