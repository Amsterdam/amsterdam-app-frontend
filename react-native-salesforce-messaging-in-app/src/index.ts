import {useEffect, useMemo, useRef, useState} from 'react'
import {EmitterSubscription, EventSubscription} from 'react-native'
import SalesforceMessagingInApp, {
  ConversationEntryFormat,
  ConversationEntrySenderRole,
  Participant,
  ParticipantChangedOperationType,
  type ConversationEntry,
  type CoreConfig,
  Choice,
  RemoteConfiguration,
  ConversationEntryRoutingType,
  ConnectionState,
  NetworkState,
  CoreError,
  ConversationEntryStatus,
  ConversationEntryBase,
} from './NativeSalesforceMessagingInApp'
import {useListenerStatus} from './useListenerStatus'

export const createCoreClient = ({
  developerName,
  organizationId,
  url,
}: CoreConfig) =>
  SalesforceMessagingInApp.createCoreClient(url, organizationId, developerName)

export const createConversationClient = (conversationId?: string) =>
  SalesforceMessagingInApp.createConversationClient(conversationId ?? null)

export const destroyStorageAndAuthorization = () =>
  SalesforceMessagingInApp.destroyStorageAndAuthorization()

export const markAsRead = (message: ConversationEntry) =>
  SalesforceMessagingInApp.markAsRead(message)

export const sendMessage = (message: string) =>
  SalesforceMessagingInApp.sendMessage(message)

export const sendReply = (choice: Choice) =>
  SalesforceMessagingInApp.sendReply(choice)

export const sendTypingEvent = () => SalesforceMessagingInApp.sendTypingEvent()

export const sendPDF = (filePath: string, fileName: string) =>
  SalesforceMessagingInApp.sendPDF(filePath, fileName)

export const sendImage = (imageBase64: string, fileName: string, uri: string) =>
  SalesforceMessagingInApp.sendImage(imageBase64, fileName, uri)

export const retrieveRemoteConfiguration = () =>
  SalesforceMessagingInApp.retrieveRemoteConfiguration()

export const retrieveTranscript = () =>
  SalesforceMessagingInApp.retrieveTranscript()

export const generateUUID = () => SalesforceMessagingInApp.generateUUID()

export const submitRemoteConfiguration = (
  remoteConfiguration: RemoteConfiguration,
  createConversationOnSubmit: boolean,
) =>
  SalesforceMessagingInApp.submitRemoteConfiguration(
    remoteConfiguration,
    createConversationOnSubmit,
  )

export const checkIfInBusinessHours = () =>
  SalesforceMessagingInApp.checkIfInBusinessHours()

export const useCreateChat = ({
  developerName,
  organizationId,
  url,
  conversationId = generateUUID(),
}: CoreConfig & {
  conversationId?: string
}) => {
  const [ready, setReady] = useState(false)
  const [newConversationId, setNewConversationId] = useState<
    string | undefined
  >(conversationId)
  const onErrorSubscription = useRef<EventSubscription | null>(null)
  const onNewMessageSubscription = useRef<EventSubscription | null>(null)
  const onUpdatedMessageSubscription = useRef<EventSubscription | null>(null)
  const onTypingStartedSubscription = useRef<EventSubscription | null>(null)
  const onTypingStoppedSubscription = useRef<EventSubscription | null>(null)
  const [messages, setMessages] = useState<ConversationEntry[]>([])
  const [isTyping, setIsTyping] = useState<ConversationEntry | false>(false)
  const [remoteConfiguration, setRemoteConfiguration] = useState<
    RemoteConfiguration | undefined
  >()
  const [error, setError] = useState<CoreError | null>(null)
  const networkStatus = useListenerStatus<NetworkState, string>(
    SalesforceMessagingInApp.onNetworkStatusChanged,
  )
  const connectionStatus = useListenerStatus<ConnectionState, string>(
    SalesforceMessagingInApp.onConnectionStatusChanged,
  )
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isWaitingForAgent, setIsWaitingForAgent] = useState<boolean>(false)
  const agentInChat = useMemo(
    () =>
      participants.some(
        participant => participant.role === ConversationEntrySenderRole.agent,
      ),
    [participants],
  )

  useEffect(() => {
    const listeners = [
      onErrorSubscription,
      onNewMessageSubscription,
      onUpdatedMessageSubscription,
      onTypingStartedSubscription,
      onTypingStoppedSubscription,
    ] as Array<React.MutableRefObject<EmitterSubscription | null>>

    if (developerName && organizationId && url) {
      setParticipants([])
      setMessages([])
      setRemoteConfiguration(undefined)
      void createCoreClient({developerName, organizationId, url}).then(() => {
        void retrieveRemoteConfiguration().then(setRemoteConfiguration, () => {
          void retrieveRemoteConfiguration().then(
            setRemoteConfiguration,
            () => {
              setError({message: 'Failed to retrieve remote configuration'})
            },
          )
        })

        listeners.forEach(listener => {
          if (listener.current) {
            listener.current.remove()
            listener.current = null
          }
        })

        onNewMessageSubscription.current =
          SalesforceMessagingInApp.onNewMessage(
            (inMessage: ConversationEntryBase) => {
              const message: ConversationEntry = inMessage as ConversationEntry
              // console.log('New message received:', message)

              if (
                message.format ===
                ConversationEntryFormat.deliveryAcknowledgement
              ) {
                setMessages(oldMessages =>
                  oldMessages.map(m =>
                    m.entryId ===
                    message.acknowledgedConversationEntryIdentifier
                      ? {
                          ...m,
                          status:
                            m.status !== ConversationEntryStatus.read
                              ? ConversationEntryStatus.delivered
                              : ConversationEntryStatus.read,
                        }
                      : m,
                  ),
                )
              } else if (
                message.format === ConversationEntryFormat.readAcknowledgement
              ) {
                setMessages(oldMessages =>
                  oldMessages.map(m =>
                    m.entryId ===
                    message.acknowledgedConversationEntryIdentifier
                      ? {...m, status: ConversationEntryStatus.read}
                      : m,
                  ),
                )
              } else {
                // check if the message is already in the list and update it, otherwise add it
                setMessages(oldMessages =>
                  oldMessages.some(m => m.entryId === message.entryId)
                    ? oldMessages.map(oldMessage =>
                        oldMessage.entryId === message.entryId
                          ? message
                          : oldMessage,
                      )
                    : [...oldMessages, message],
                )
              }

              if (
                message.format === ConversationEntryFormat.participantChanged
              ) {
                message.operations.forEach(({participant, type}) => {
                  if (type === ParticipantChangedOperationType.add) {
                    setParticipants(currentParticipants => [
                      ...currentParticipants,
                      participant,
                    ])

                    if (
                      participant.role === ConversationEntrySenderRole.agent
                    ) {
                      setIsWaitingForAgent(false)
                    }
                  } else {
                    setParticipants(currentParticipants =>
                      currentParticipants.filter(
                        currentParticipant =>
                          !(
                            currentParticipant.displayName ===
                              participant.displayName &&
                            currentParticipant.local === participant.local &&
                            currentParticipant.role === participant.role
                          ),
                      ),
                    )
                  }
                })
              } else if (
                message.format === ConversationEntryFormat.routingResult &&
                message.routingType === ConversationEntryRoutingType.transfer
              ) {
                setIsWaitingForAgent(true)
              }
            },
          )
        onUpdatedMessageSubscription.current =
          SalesforceMessagingInApp.onUpdatedMessage(
            (inMessage: ConversationEntryBase) => {
              const message: ConversationEntry = inMessage as ConversationEntry
              // console.log('Updated message received:', message)

              setMessages(oldMessages =>
                oldMessages.map(oldMessage =>
                  oldMessage.entryId === message.entryId ? message : oldMessage,
                ),
              )
            },
          )
        onErrorSubscription.current = SalesforceMessagingInApp.onError(
          (state: CoreError) => {
            // console.log('onError:', state)
            setError(state)
          },
        )
        onTypingStartedSubscription.current =
          SalesforceMessagingInApp.onTypingStarted(
            (inMessage: ConversationEntryBase) => {
              const message: ConversationEntry = inMessage as ConversationEntry
              // console.log('Started typing:', message)

              setIsTyping(message)
            },
          )
        onTypingStoppedSubscription.current =
          SalesforceMessagingInApp.onTypingStopped(
            (_message: ConversationEntryBase) => {
              // console.log('Typing stopped:', _message)
              setIsTyping(false)
            },
          )

        void createConversationClient(conversationId ?? newConversationId).then(
          (resultConversationId: string) => {
            setNewConversationId(resultConversationId)
            setReady(true)
          },
        )
      })
    }

    return () => {
      listeners.forEach(listener => {
        listener.current?.remove()
        listener.current = null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, developerName, organizationId, url])

  return {
    agentInChat,
    connectionStatus,
    conversationId: newConversationId,
    isTyping,
    isWaitingForAgent,
    error,
    messages,
    networkStatus,
    participants,
    ready,
    remoteConfiguration,
  }
}
