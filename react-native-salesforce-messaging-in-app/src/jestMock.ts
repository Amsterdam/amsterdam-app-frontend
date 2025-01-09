export enum ConversationEntryFormat {
  attachments = 'Attachments',
  carousel = 'Carousel',
  deliveryAcknowledgement = 'DeliveryAcknowledgement',
  imageMessage = 'Image',
  inputs = 'Inputs',
  listPicker = 'Buttons',
  participantChanged = 'ParticipantChanged',
  quickReplies = 'QuickReplies',
  readAcknowledgement = 'ReadAcknowledgement',
  result = 'Result',
  richLink = 'RichLink',
  routingResult = 'RoutingResult',
  routingWorkResult = 'RoutingWorkResult',
  selections = 'Selections',
  text = 'Text',
  transcript = 'Transcript',
  typingStartedIndicator = 'TypingStartedIndicator',
  typingStoppedIndicator = 'TypingStoppedIndicator',
  unspecified = 'Unspecified',
  webview = 'WebView',
}

/**
 * @deprecated unverified values, use ConversationEntryFormat
 */
export enum ConversationEntryType {
  deliveryAcknowledgement = 'DeliveryAcknowledgement',
  message = 'Message',
  participantChanged = 'ParticipantChanged',
  readAcknowledgement = 'ReadAcknowledgement',
  routingResult = 'RoutingResult',
  routingWorkResult = 'RoutingWorkResult',
  typingIndicator = 'TypingIndicator',
  unknownEntry = 'UnknownEntry',
}

export enum ConversationEntryStatus {
  delivered = 'Delivered',
  error = 'Error',
  read = 'Read',
  sending = 'Sending',
  sent = 'Sent',
}

export enum ConversationEntrySenderRole {
  agent = 'Agent',
  chatbot = 'Chatbot',
  system = 'System',
  user = 'USER',
}

export enum ConversationEntryRoutingType {
  initial = 'Initial',
  transfer = 'Transfer',
}

export enum ConversationEntryRoutingFailureType {
  cancelled = 'Cancelled',
  none = 'None',
  routingError = 'RoutingError',
  submissionError = 'SubmissionError',
  unknown = 'Unknown',
}
export enum ConversationEntryRoutingWorkType {
  accepted = 'Accepted',
  assinged = 'Assinged',
  closed = 'Closed',
}

export enum ParticipantChangedOperationType {
  add = 'add',
  remove = 'remove',
}

export enum ConnectionState {
  closed = 'Closed',
  connecting = 'Connecting',
  open = 'Open',
}

export enum NetworkState {
  connected = 'Connected',
  offline = 'Offline',
}
