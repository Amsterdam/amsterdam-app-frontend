import {AddressResponse, Coordinates} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

type SharedParams = {rows?: number}

type AddressForCoordinatesQueryParams = Coordinates & SharedParams

type AddressSuggestionQueryParams = {
  address: string
  city?: string
  street?: string
} & SharedParams

// Source: https://api.pdok.nl/bzk/locatieserver/search/v3_1/ui/#/Locatieserver/free
type PdokFreeApiParams = {
  /** Default field value relevance modifiers, space separated key:value^modifier combinations, e.g. 'type:provincie^1.5' */
  bq?: string[]
  /** Default field to apply the search query to */
  df?: string
  /** Return fields, space separated */
  fl?: string
  /** Filter query, array of key:value pairs, e.g. 'bron:BAG' */
  fq?: string[]
  /** Latitude, float */
  lat?: number
  /** Longitude, float */
  lon?: number
  /** Search query */
  q?: string
  /** Default field relevance modifiers, space separated key^modifier pairs, e.g. 'exacte_match^0.5' */
  qf?: string
  /** Number of results */
  rows?: number
  /** Sort key and order, comma separated key direction pairs, e.g. 'score desc' */
  sort?: string
  /** Zero-based index of first result */
  start?: number
  /** Output format: json|xml */
  wt?: string
}

const defaultPdokFreeApiParams: PdokFreeApiParams = {
  bq: ['type:weg^1.5', 'type:adres^1'],
  fl: 'id straatnaam huisnummer huisletter huisnummertoevoeging postcode woonplaatsnaam type score nummeraanduiding_id centroide_ll',
  qf: 'exacte_match^0.5 suggest^0.5 straatnaam^0.6 huisnummer^0.5 huisletter^0.5 huisnummertoevoeging^0.5',
}

const defaultFq: PdokFreeApiParams['fq'] = ['bron:BAG']

const path = '/free'
const keepUnusedDataFor = CacheLifetime.day

export const addressApi = baseApi.injectEndpoints({
  endpoints: ({query}) => ({
    getAddressForCoordinates: query<
      AddressResponse | undefined,
      AddressForCoordinatesQueryParams
    >({
      query: ({lat, lon, rows = 1}) => ({
        url: generateRequestUrl<PdokFreeApiParams>({
          params: {
            ...defaultPdokFreeApiParams,
            fq: [...defaultFq, 'type:adres'],
            lat,
            lon,
            rows,
          },
          path,
        }),
        slug: ModuleSlug.address,
        keepUnusedDataFor,
      }),
    }),
    getAddressSuggestions: query<
      AddressResponse | undefined,
      AddressSuggestionQueryParams
    >({
      query: ({address, city, rows = 20, street}) => ({
        url: generateRequestUrl<PdokFreeApiParams>({
          params: {
            ...defaultPdokFreeApiParams,
            fq: [
              ...defaultFq,
              `type:${street ? 'adres' : '(weg OR adres)'}`,
              `woonplaatsnaam:${city?.toLowerCase() ?? '(amsterdam OR weesp)'}`,
              ...(street ? [`straatnaam:"${street.toLowerCase()}"`] : []),
            ],
            q: address,
            rows,
          },
          path,
        }),
        slug: ModuleSlug.address,
        keepUnusedDataFor,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetAddressForCoordinatesQuery, useGetAddressSuggestionsQuery} =
  addressApi
