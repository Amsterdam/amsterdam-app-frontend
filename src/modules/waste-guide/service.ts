import {
  WasteGuideEndpointName,
  WasteGuideQueryArg,
  WasteGuideResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services'
import {CacheTimeout} from '@/types'
import {generateRequestUrl} from '@/utils'

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getGarbageCollectionArea]: builder.query<
      WasteGuideResponse,
      WasteGuideQueryArg
    >({
      query: params => ({
        url: generateRequestUrl({
          params,
          path: '/waste-guide/search',
        }),
      }),
      keepUnusedDataFor: CacheTimeout.day,
      transformResponse: (response: {result: WasteGuideResponse}) =>
        response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetGarbageCollectionAreaQuery} = wasteGuideApi
