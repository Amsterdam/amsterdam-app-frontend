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
  attachments = 'Attachments', // unverified
  carousel = 'Carousel', // unverified
  imageMessage = 'ImageMessage', // unverified
  inputs = 'Inputs', // unverified
  listPicker = 'ListPicker', // unverified
  quickReplies = 'QuickReplies',
  result = 'Result', // unverified
  richLink = 'RichLink',
  selections = 'Selections', // unverified
  text = 'Text',
  unspecified = 'Unspecified',
  webview = 'Webview', // unverified
}

export enum ConversationEntryStatus {
  sending = 'Sending',
  sent = 'Sent',
}

export enum ConversationEntrySenderRole {
  chatbot = 'Chatbot',
  employee = 'Employee', // unsure
  system = 'System',
  user = 'USER',
}

export type ConversationEntryBase = {
  conversationId: string
  entryId: string
  // format: ConversationEntryFormat
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
   * display name of the sender
   */
  senderDisplayName: string
  /**
   * Is the sender the local user
   */
  senderLocal: boolean
  senderOptions: Choice[]
  /**
   * Sender role
   */
  senderRole: ConversationEntrySenderRole
  senderSubject: string
  status: ConversationEntryStatus
  /**
   * deze zou hier nog weg moeten
   */
  text: string
  timestamp: number
  title?: string
  url?: string
}

export type ConversationEntry = ConversationEntryBase &
  (
    | ConversationEntryText
    | ConversationEntryCarousel
    | ConversationEntryRichLink
    | ConversationEntryQuickReplies
    | ConversationEntryAttachments
    | ConversationEntryImageMessage
    | ConversationEntryInputs
    | ConversationEntryListPicker
    | ConversationEntrySelections
    | ConversationEntryWebview
    | ConversationEntryResult
    | ConversationEntryUnspecified
  )

export type Attachment = {
  file?: string
  identifier: string
  mimeType: string
  name: string
  url: string
}

export type TitleLinkItem = {
  interactionItems: Choice[]
  itemType: string
  referenceId: string
  secondarySubTitle: string
  subTitle: string
  tertiarySubTitle: string
}

export type ConversationEntryText = {
  format: ConversationEntryFormat.text
  text: string
}
export type ConversationEntryImageMessage = {
  format: ConversationEntryFormat.imageMessage
}
export type ConversationEntryUnspecified = {
  format: ConversationEntryFormat.unspecified
}
export type ConversationEntryWebview = {
  format: ConversationEntryFormat.webview
}
export type ConversationEntryResult = {
  format: ConversationEntryFormat.result
}
export type ConversationEntryInputs = {
  format: ConversationEntryFormat.inputs
}
export type ConversationEntryListPicker = {
  format: ConversationEntryFormat.listPicker
  text: string
}
export type ConversationEntrySelections = {
  format: ConversationEntryFormat.selections
}
export type ConversationEntryCarousel = {
  format: ConversationEntryFormat.carousel
  items: TitleLinkItem[]
}
export type ConversationEntryAttachments = {
  attachments: Attachment[]
  format: ConversationEntryFormat.attachments
}
export type ConversationEntryQuickReplies = {
  /**
   * in case of format QuickReplies these are the quick reply options
   */
  choices: Choice[]
  format: ConversationEntryFormat.quickReplies
  /**
   * in case of format QuickReplies these are the selected quick reply options
   */
  selected: Choice[]
  text: string
}

export type ConversationEntryRichLink = {
  asset?: {
    height: number
    imageBase64: string
    width: number
  }
  format: ConversationEntryFormat.richLink
  title: string
  url: string
}

export interface Choice {
  optionId: string
  optionValue: string
  parentEntryId: string
  title: string
}
