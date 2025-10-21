import {
  ConversationEntry,
  ConversationEntryFormat,
  ConversationEntrySenderRole,
} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

export const filterOutCloseChatMessage = (
  messages: ConversationEntry[],
): ConversationEntry[] =>
  messages.filter(
    ({format, sender: {role}}) =>
      !(
        format === ConversationEntryFormat.text &&
        role === ConversationEntrySenderRole.user
      ),
  )
