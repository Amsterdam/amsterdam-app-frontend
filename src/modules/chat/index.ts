import {Chat} from '@/modules/chat/components/Chat'
import {chatSlice, ChatState} from '@/modules/chat/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ChatState)[] = ['conversationId']

export const chatModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'ChatModule',
  PostRenderComponent: Chat,
  reduxConfigs: [
    {
      key: ReduxKey.chat,
      persistVersion: 0,
      persistWhitelist,
      slice: chatSlice,
    },
  ],
  slug: ModuleSlug.chat,
}
