import {
  ConversationEntry,
  ConversationEntryFormat,
} from 'react-native-salesforce-messaging-in-app/src/types'

export const filterOutDeliveryAcknowledgements = (
  messages: ConversationEntry[],
): ConversationEntry[] =>
  messages.filter(
    ({format}) =>
      format !== ConversationEntryFormat.deliveryAcknowledgement &&
      format !== ConversationEntryFormat.readAcknowledgement,
  )
