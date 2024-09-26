export type RemoteConfiguration = {
  data?: {
    forms?: unknown[]
  }
}

export type CoreConfig = {
  /**
   * API name for the deployment
   */
  developerName: string
  /**
   * Organization ID
   */
  organizationId: string
  /**
   * Service API URL
   */
  url: string
}

export type NativeSalesforceMessagingInApp = {
  addListener: (eventName: string) => void
  checkIfInBusinessHours: () => Promise<boolean>
  createConversationClient: (conversationId: string | null) => Promise<string>
  createCoreClient: (
    url: string,
    organizationId: string,
    developerName: string,
  ) => Promise<void>
  removeListeners: (count: number) => void
  retrieveRemoteConfiguration: () => Promise<RemoteConfiguration>
  sendMessage: (message: string) => Promise<void>
}

export enum ConversationEntryFormat {
  quickReplies = 'QuickReplies',
  text = 'Text',
  unspecified = 'Unspecified',
}

export enum ConversationEntryStatus {
  sending = 'Sending',
  sent = 'Sent',
}

export enum ConversationEntrySenderRole {
  chatbot = 'Chatbot',
  system = 'System',
  user = 'USER',
}

export type ConversationEntry = {
  /**
   * in case of format QuickReplies these are the quick reply options
   */
  choices?: Choice[]
  conversationId: string
  entryId: string
  format: ConversationEntryFormat
  /**
   * the id of the ConversationEntry this is a reply to
   */
  inReplyToEntryId: string
  messageType: string
  /**
   * @deprecated as it is used to see if we handle the payload properly
   */
  payloadDescription: string
  payloadId: string
  /**
   * in case of format QuickReplies these are the selected quick reply options
   */
  selected?: Choice[]
  /**
   * display name of the sender
   */
  senderDisplayName: string
  /**
   * Is the sender the local user
   */
  senderLocal: boolean
  senderOptions: unknown[]
  /**
   * Sender role
   */
  senderRole: ConversationEntrySenderRole
  senderSubject: string
  status: ConversationEntryStatus
  text?: string
  timestamp: number
}

export interface Choice {
  optionId: string
  optionValue: string
  parentEntryId: string
  title: string
}
