import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/types'
import {CLOSE_CHAT_MESSAGE} from '@/modules/chat/constants'

export const filterOutCloseChatMessage = (
  messages: ConversationEntry[],
): ConversationEntry[] =>
  messages.filter(
    ({format, text, sender: {role}}) =>
      !(
        format === ConversationEntryFormat.text &&
        text === CLOSE_CHAT_MESSAGE &&
        role === ConversationEntrySenderRole.user
      ),
  )
