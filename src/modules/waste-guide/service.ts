import {
  WasteGuideEndpointName,
  WasteGuideQueryArg,
  WasteGuideResponse,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/init'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getGarbageCollectionArea]: builder.query<
      WasteGuideResponseFraction[],
      WasteGuideQueryArg
    >({
      query: params => ({
        api: 'wasteGuideUrl',
        url: generateRequestUrl({
          params: {...params, _format: 'json'},
          path: '/search',
        }),
      }),
      transformResponse: (response: WasteGuideResponse) =>
        response._embedded.afvalwijzer,
      keepUnusedDataFor: CacheLifetime.day,
    }),
  }),
  overrideExisting: true,
})

export const {useGetGarbageCollectionAreaQuery} = wasteGuideApi
