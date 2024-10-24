export enum PreChatFieldTypes {
  checkbox = 'Checkbox',
  choiceList = 'ChoiceList',
  email = 'Email',
  number = 'Number',
  phone = 'Phone',
  text = 'Text',
  textArea = 'TextArea',
}

export type PreChatField = {
  editable: boolean
  identifier: string
  isHidden: boolean
  label: string
  maxLength: number
  name: string
  order: number
  required: boolean
  type: PreChatFieldTypes
  value: string
}

export type ChoiceListValue = {
  isDefaultValue: boolean
  label: string
  order: number
  valueId: string
  valueName: string
}

export type ChoiceList = {
  identifier: string
  values: ChoiceListValue[]
}

export type ValueDependency = {
  childId: string
  parentId: string
}

export type RemoteConfiguration = {
  choiceListConfiguration: {
    choiceLists: ChoiceList[]
    valueDependencies: ValueDependency[]
  }
  deploymentType: 'Mobile'
  name: 'GemeenteAmsterdamMessaging_pp'
  preChatConfiguration: [
    {
      formType: 'PreChat'
      hiddenPreChatFields: PreChatField[]
      preChatFields: PreChatField[]
    },
  ]
  timestamp: number
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
  attachments = 'Attachments',
  carousel = 'Carousel',
  deliveryAcknowledgement = 'DeliveryAcknowledgement',
  imageMessage = 'Image',
  inputs = 'Inputs',
  listPicker = 'Buttons',
  participantChanged = 'ParticipantChanged',
  quickReplies = 'QuickReplies',
  result = 'Result',
  richLink = 'RichLink',
  routingResult = 'RoutingResult',
  routingWorkResult = 'RoutingWorkResult',
  selections = 'Selections',
  text = 'Text',
  typingStartedIndicator = 'TypingStartedIndicator',
  typingStoppedIndicator = 'TypingStoppedIndicator',
  unspecified = 'Unspecified',
  webview = 'WebView',
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
   * sender of the ConversationEntry
   */
  sender: Participant
  /**
   * display name of the sender
   */
  senderDisplayName: string
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
    | ConversationEntryTypingStartedIndicator
    | ConversationEntryTypingStoppedIndicator
    | ConversationEntryUnspecified
    | ConversationEntryRoutingResult
    | ConversationEntryRoutingWorkResult
    | ConversationEntryParticipantChanged
    | ConversationEntryDeliveryAcknowledgement
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

export type Participant = {
  /**
   * display name of the participant
   */
  displayName: string
  /**
   * Is the participant the local user
   */
  local: boolean
  options: Choice[]
  /**
   * Participant role
   */
  role: ConversationEntrySenderRole
  subject: string
}

export type ConversationEntryText = {
  format: ConversationEntryFormat.text
  text: string
}
export type ConversationEntryImageMessage = {
  format: ConversationEntryFormat.imageMessage
  // TODO
}
export type ConversationEntryUnspecified = {
  format: ConversationEntryFormat.unspecified
}
export type ConversationEntryWebview = {
  format: ConversationEntryFormat.webview
  // TODO
}
export type ConversationEntryResult = {
  format: ConversationEntryFormat.result
  // TODO
}
export type ConversationEntryInputs = {
  format: ConversationEntryFormat.inputs
  // TODO
}
export type ConversationEntryListPicker = {
  format: ConversationEntryFormat.listPicker
  // TODO
  text: string
}
export type ConversationEntrySelections = {
  format: ConversationEntryFormat.selections
  // TODO
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

export type ConversationEntryTypingStartedIndicator = {
  format: ConversationEntryFormat.typingStartedIndicator
  startedTimestamp: number
}
export type ConversationEntryTypingStoppedIndicator = {
  format: ConversationEntryFormat.typingStoppedIndicator
  startedTimestamp: number
}
export type ConversationEntryRoutingResult = {
  estimatedWaitTime: number
  failureReason: string
  failureType: ConversationEntryRoutingFailureType
  format: ConversationEntryFormat.routingResult
  isEWTAvailable: boolean
  isEWTRequested: boolean
  recordId: string
  routingType: ConversationEntryRoutingType
}
export type ConversationEntryRoutingWorkResult = {
  format: ConversationEntryFormat.routingWorkResult
  workType: ConversationEntryRoutingWorkType
}
export type ConversationEntryDeliveryAcknowledgement = {
  format: ConversationEntryFormat.deliveryAcknowledgement
  // TODO
}
export type ConversationEntryParticipantChanged = {
  format: ConversationEntryFormat.participantChanged
  operations: Array<{
    participant: Participant
    type: ParticipantChangedOperationType
  }>
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

export type Choice = {
  optionId: string
  optionValue: string
  parentEntryId: string
  title: string
}
