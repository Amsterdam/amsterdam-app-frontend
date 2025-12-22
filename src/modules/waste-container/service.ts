import {DeviatingApiSlug} from '@/environment'
import {
  WasteContainerApi,
  WasteContainerEndpointName,
} from '@/modules/waste-container/types'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const wasteContainerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [WasteContainerEndpointName.getWasteCard]: builder.query<
      WasteContainerApi['getWasteCard']['response'],
      WasteContainerApi['getWasteCard']['params']
    >({
      query: params => ({
        params,
        slug: DeviatingApiSlug.waste,
        url: '/container/pass-number',
      }),
      keepUnusedDataFor: CacheLifetime.day,
    }),
  }),
  overrideExisting: true,
})

export const {useGetWasteCardQuery} = wasteContainerApi
