import {Chat} from '@/modules/chat/components/Chat'
import {onNotificationEvent} from '@/modules/chat/onNotificationEvent'
import {chatSlice, ChatState} from '@/modules/chat/slice'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ChatState)[] = ['conversationId']

export const chatModule: ModuleClientConfig = {
  hiddenInMenu: true,
  onNotificationEvent,
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
  alwaysEnabled: true,
}
