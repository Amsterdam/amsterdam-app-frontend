import {ResponseAddress, BagResponse, Address} from '../types'
import {generateRequestUrl} from '../utils'
import {baseApi} from './init'

const addressUrl = 'https://api.data.amsterdam.nl/atlas/search/adres'
const bagUrl = 'https://api.data.amsterdam.nl/atlas/typeahead/bag'

export const addressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAddress: builder.query<Address, string>({
      query: params => {
        return generateRequestUrl(addressUrl, {features: 2, q: params})
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
        return generateRequestUrl(bagUrl, {features: 2, q: params})
      },
    }),
  }),
})

export const {useGetAddressQuery, useGetBagQuery} = addressApi
