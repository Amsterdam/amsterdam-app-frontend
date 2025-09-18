import {DeviatingApiSlug} from '@/environment'
import {afterError} from '@/modules/city-pass/utils/afterError'
import {PollingStationsResponse, VoteEndpointName} from '@/modules/vote/types'
import {baseApi} from '@/services/baseApi'

export const voteApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [VoteEndpointName.locations]: builder.query<PollingStationsResponse, void>({
      query: () => ({
        method: 'GET',
        slug: DeviatingApiSlug.pollingStations,
        url: '/locations',
        afterError,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useLocationsQuery} = voteApi
