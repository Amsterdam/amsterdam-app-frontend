import {baseApi} from '../../services'
import {Template} from './types'

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
