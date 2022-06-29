import {Template} from './types'
import {baseApi} from '@/services'

export const templateApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    doSomething: builder.query<Template, void>({
      query: () => {
        return '/template'
      },
    }),
  }),
  overrideExisting: true,
})

export const {useDoSomethingQuery} = templateApi
