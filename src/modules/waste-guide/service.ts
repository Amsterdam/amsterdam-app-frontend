import {ModuleSlug} from '@/modules/slugs'
import {
  WasteGuideEndpointName,
  WasteGuideQueryArg,
  WasteGuideResponse,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/init'
import {CacheLifetime, TimeOutDuration} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getGarbageCollectionArea]: builder.query<
      WasteGuideResponseFraction[],
      WasteGuideQueryArg
    >({
      query: params => ({
        slug: ModuleSlug['waste-guide'],
        url: generateRequestUrl({
          params: {...params, _format: 'json'},
          path: '/search',
        }),
        timeout: TimeOutDuration.long,
      }),
      transformResponse: (response: WasteGuideResponse) =>
        response._embedded.afvalwijzer,
      keepUnusedDataFor: CacheLifetime.day,
    }),
  }),
  overrideExisting: true,
})

export const {useGetGarbageCollectionAreaQuery} = wasteGuideApi
