import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const chatModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'ChatModule',
  slug: ModuleSlug.chat,
}
