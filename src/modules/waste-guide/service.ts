import {DeviatingApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  WasteGuideResponse,
} from '@/modules/waste-guide/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime, TimeOutDuration} from '@/types/api'

export const wasteGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteGuideEndpointName.getWasteGuide]: builder.query<
      WasteGuideResponse,
      string
    >({
      query: bag_nummeraanduiding_id => ({
        params: {bag_nummeraanduiding_id},
        slug: DeviatingApiSlug.waste,
        timeout: TimeOutDuration.long,
        url: '/guide',
      }),
      keepUnusedDataFor: CacheLifetime.day,
    }),
  }),
  overrideExisting: true,
})

export const {useGetWasteGuideQuery} = wasteGuideApi
