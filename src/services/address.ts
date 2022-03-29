import {getEnvironment} from '../environment'
import {ResponseAddress, BagResponse, Address} from '../types'
import {generateRequestUrl} from '../utils'
import {baseApi} from './init'

const addressPath = '/search/adres'
const bagPath = '/typeahead/bag'

export const addressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAddress: builder.query<Address, string>({
      query: params => {
        return generateRequestUrl({
          baseUrl: getEnvironment().atlasUrl,
          params: {features: 2, q: params},
          path: addressPath,
        })
      },
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
      query: params => {
        return generateRequestUrl({
          baseUrl: getEnvironment().atlasUrl,
          params: {features: 2, q: params},
          path: bagPath,
        })
      },
    }),
  }),
})

export const {useGetAddressQuery, useGetBagQuery} = addressApi
