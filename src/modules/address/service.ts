import {AddressSuggestResponse} from '@/modules/address/types'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

type QueryParams = {
  address: string
  city?: string
  street?: string
}

export const addressApi = baseApi.injectEndpoints({
  endpoints: ({query}) => ({
    getAddressSuggestions: query<
      AddressSuggestResponse | undefined,
      QueryParams
    >({
      query: ({address, city, street}) => ({
        url: generateRequestUrl({
          params: {
            q: address,
            fl: 'straatnaam huisnummer huisletter huisnummertoevoeging postcode woonplaatsnaam type score nummeraanduiding_id centroide_ll',
            fq: [
              `type:(${street ? 'adres' : 'weg OR adres'})`,
              `woonplaatsnaam:(${city?.toLowerCase() ?? 'amsterdam OR weesp'})`,
              ...(street ? [`straatnaam:${street.toLowerCase()}`] : []),
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

export const {useGetAddressSuggestionsQuery} = addressApi
