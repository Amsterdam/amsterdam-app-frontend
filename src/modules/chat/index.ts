import {Chat} from '@/modules/chat/components/Chat'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const chatModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'ChatModule',
  PreRenderComponent: Chat,
  slug: ModuleSlug.chat,
}