import {Template} from '@/modules/template/types'
import {baseApi} from '@/services'

export const templateApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    doSomething: builder.query<Template, void>({
      query: () => '/template',
    }),
  }),
  overrideExisting: true,
})

export const {useDoSomethingQuery} = templateApi
