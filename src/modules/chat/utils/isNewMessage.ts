import {ConversationEntryFormat} from 'react-native-salesforce-messaging-in-app/src/types'

export const isNewMessage = (format: ConversationEntryFormat) =>
  format === ConversationEntryFormat.attachments ||
  format === ConversationEntryFormat.carousel ||
  format === ConversationEntryFormat.imageMessage ||
  format === ConversationEntryFormat.inputs ||
  format === ConversationEntryFormat.listPicker ||
  format === ConversationEntryFormat.richLink ||
  format === ConversationEntryFormat.quickReplies ||
  format === ConversationEntryFormat.routingResult ||
  format === ConversationEntryFormat.routingWorkResult ||
  format === ConversationEntryFormat.selections ||
  format === ConversationEntryFormat.text
