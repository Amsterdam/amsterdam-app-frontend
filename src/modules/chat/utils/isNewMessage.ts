import {ConversationEntryFormat} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

export const isNewMessage = (format: ConversationEntryFormat) =>
  format === ConversationEntryFormat.attachments ||
  format === ConversationEntryFormat.carousel ||
  format === ConversationEntryFormat.imageMessage ||
  format === ConversationEntryFormat.inputs ||
  format === ConversationEntryFormat.listPicker ||
  format === ConversationEntryFormat.richLink ||
  format === ConversationEntryFormat.quickReplies ||
  format === ConversationEntryFormat.selections ||
  format === ConversationEntryFormat.text
