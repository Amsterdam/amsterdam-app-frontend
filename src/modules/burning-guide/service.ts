import {BurningGuideEndpointName} from '@/modules/burning-guide/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const burningGuideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [BurningGuideEndpointName.burningGuide]: builder.query<unknown, void>({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug['burning-guide'],
        url: '/guide',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useBurningGuideQuery} = burningGuideApi
