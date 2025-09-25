import {DeviatingApiSlug} from '@/environment'
import {
  WasteGuideEndpointName,
  WasteGuideResponse,
} from '@/modules/waste-guide/types'
import {
  updateCalendarEventLabels,
  updateFractionLabels,
} from '@/modules/waste-guide/utils/updateFractionLabels'
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
      transformResponse: (
        baseQueryReturnValue: unknown,
      ): WasteGuideResponse => {
        const value = baseQueryReturnValue as WasteGuideResponse

        if (value && Array.isArray(value.waste_types)) {
          return {
            ...value,
            calendar: updateCalendarEventLabels(value.calendar),
            waste_types: updateFractionLabels(value.waste_types),
          }
        }

        return value
      },
    }),
  }),
  overrideExisting: true,
})

export const {useGetWasteGuideQuery} = wasteGuideApi
