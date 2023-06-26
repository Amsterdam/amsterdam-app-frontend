import {contactSlice} from '@/modules/contact/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const module: ModuleClientConfig = {
  name: 'ContactModule',
  reduxConfigs: [
    {
      key: 'contact',
      persistVersion: 0,
      slice: contactSlice,
    },
  ],
  slug: ModuleSlug.contact,
}
