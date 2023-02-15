import {Address, BagResponse, ResponseAddress} from '@/modules/address'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types'
import {generateRequestUrl} from '@/utils'

const addressPath = '/search/adres/'
const bagPath = '/typeahead/bag/'

export const addressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAddress: builder.query<Address, string>({
      query: params => ({
        url: generateRequestUrl({
          params: {features: 2, q: params},
          path: addressPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
      transformResponse: (response: ResponseAddress) => {
        const address = response.results[0]
        const {
          adres,
          bag_huisletter,
          bag_toevoeging,
          centroid,
          huisnummer,
          postcode,
          straatnaam,
          woonplaats,
        } = address
        return {
          adres,
          bag_huisletter,
          bag_toevoeging,
          centroid,
          huisnummer,
          postcode,
          straatnaam,
          woonplaats,
        }
      },
    }),
    getBag: builder.query<BagResponse[], string>({
      query: address => ({
        url: generateRequestUrl({
          params: {features: 2, q: address},
          path: bagPath,
        }),
        api: 'atlasUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetAddressQuery, useGetBagQuery} = addressApi
