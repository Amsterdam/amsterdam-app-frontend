import {AddressResponse, Coordinates} from '@/modules/address/types'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

type AddressForCoordinatesQueryParams = Coordinates

type AddressSuggestionQueryParams = {
  address: string
  city?: string
  street?: string
}

const returnFields =
  'id straatnaam huisnummer huisletter huisnummertoevoeging postcode woonplaatsnaam type score nummeraanduiding_id centroide_ll'

export const addressApi = baseApi.injectEndpoints({
  endpoints: ({query}) => ({
    getAddressForCoordinates: query<
      AddressResponse | undefined,
      AddressForCoordinatesQueryParams
    >({
      query: ({lat, lon}) => ({
        url: generateRequestUrl({
          params: {
            lat,
            lon,
            fl: returnFields,
            rows: 1,
          },
          path: '/reverse',
        }),
        api: 'addressUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
    }),
    getAddressSuggestions: query<
      AddressResponse | undefined,
      AddressSuggestionQueryParams
    >({
      query: ({address, city, street}) => ({
        url: generateRequestUrl({
          params: {
            q: address,
            fl: returnFields,
            fq: [
              `type:${street ? 'adres' : '(weg OR adres)'}`,
              `woonplaatsnaam:${city?.toLowerCase() ?? '(amsterdam OR weesp)'}`,
              ...(street ? [`straatnaam:"${street.toLowerCase()}"`] : []),
              'bron:BAG',
            ],
            qf: 'exacte_match^0.5 suggest^0.5 straatnaam^0.6 huisnummer^0.5 huisletter^0.5 huisnummertoevoeging^0.5',
            bq: ['type:weg^1.5', 'type:adres^1'],
            rows: 20,
          },
          path: '/free',
        }),
        api: 'addressUrl',
        keepUnusedDataFor: CacheLifetime.day,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetAddressForCoordinatesQuery, useGetAddressSuggestionsQuery} =
  addressApi
