import {baseApi} from '@/services'

export const constructionWorkEditorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    doSomething: builder.query<{}, void>({
      query: () => {
        return '/template'
      },
    }),
  }),
  overrideExisting: true,
})

export const {useDoSomethingQuery} = constructionWorkEditorApi
