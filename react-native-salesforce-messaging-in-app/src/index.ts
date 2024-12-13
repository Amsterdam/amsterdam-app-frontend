import {useEffect, useMemo, useRef, useState} from 'react'
import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native'
import {
  ConversationEntryFormat,
  ConversationEntrySenderRole,
  Participant,
  ParticipantChangedOperationType,
  type ConversationEntry,
  type CoreConfig,
  type NativeSalesforceMessagingInApp,
  Choice,
  RemoteConfiguration,
  ConversationEntryRoutingType,
  ConnectionState,
  NetworkState,
  CoreError,
} from './types'
import type {Spec} from './NativeSalesforceMessagingInApp'

const LINKING_ERROR =
  "The package 'react-native-salesforce-messaging-in-app' doesn't seem to be linked. Make sure: \n\n" +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n'

// @ts-expect-error default code of a library
const isTurboModuleEnabled = global.__turboModuleProxy != null

const SalesforceMessagingInAppModule = isTurboModuleEnabled
  ? (
      require('./NativeSalesforceMessagingInApp') as {
        default: Spec
      }
    ).default
  : (NativeModules.SalesforceMessagingInApp as NativeSalesforceMessagingInApp)

const SalesforceMessagingInApp =
  SalesforceMessagingInAppModule ??
  new Proxy(
    {},
    {
      get: () => {
        throw new Error(LINKING_ERROR)
      },
    },
  )

const messagingEventEmitter = new NativeEventEmitter(
  SalesforceMessagingInAppModule,
)

// const subscription: EmitterSubscription | null = null

export const createCoreClient = ({
  developerName,
  organizationId,
  url,
}: CoreConfig) =>
  SalesforceMessagingInApp.createCoreClient(url, organizationId, developerName)

// const messages: unknown[] = []

export const createConversationClient = (conversationId?: string) =>
  SalesforceMessagingInApp.createConversationClient(conversationId ?? null)

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
  const onErrorSubscription = useRef<EmitterSubscription | null>(null)
  const onNewMessageSubscription = useRef<EmitterSubscription | null>(null)
  const onUpdatedMessageSubscription = useRef<EmitterSubscription | null>(null)
  const onNetworkStatusChangedSubscription = useRef<EmitterSubscription | null>(
    null,
  )
  const onConnectionStatusChangedSubscription =
    useRef<EmitterSubscription | null>(null)
  const onTypingStartedSubscription = useRef<EmitterSubscription | null>(null)
  const onTypingStoppedSubscription = useRef<EmitterSubscription | null>(null)
  const [messages, setMessages] = useState<ConversationEntry[]>([])
  const [isTyping, setIsTyping] = useState<ConversationEntry | false>(false)
  const [remoteConfiguration, setRemoteConfiguration] = useState<
    RemoteConfiguration | undefined
  >()
  const [error, setError] = useState<CoreError | null>(null)
  const [networkStatus, setNetworkStatus] = useState<NetworkState | null>(null)
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionState | null>(null)
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
      onNetworkStatusChangedSubscription,
      onConnectionStatusChangedSubscription,
      onTypingStartedSubscription,
      onTypingStoppedSubscription,
    ] as Array<React.MutableRefObject<EmitterSubscription | null>>

    if (developerName && organizationId && url) {
      setParticipants([])
      setMessages([])
      setRemoteConfiguration(undefined)
      void createCoreClient({developerName, organizationId, url}).then(() => {
        void retrieveRemoteConfiguration().then(setRemoteConfiguration)

        listeners.forEach(listener => {
          if (listener.current) {
            listener.current.remove()
            listener.current = null
          }
        })

        onNewMessageSubscription.current = messagingEventEmitter.addListener(
          'onNewMessage',
          (message: ConversationEntry) => {
            // console.log('New message received:', message)

            setMessages(oldMessages => [...oldMessages, message])

            if (message.format === ConversationEntryFormat.participantChanged) {
              message.operations.forEach(({participant, type}) => {
                if (type === ParticipantChangedOperationType.add) {
                  setParticipants(currentParticipants => [
                    ...currentParticipants,
                    participant,
                  ])

                  if (participant.role === ConversationEntrySenderRole.agent) {
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
          messagingEventEmitter.addListener(
            'onUpdatedMessage',
            (message: ConversationEntry) => {
              // console.log('Updated message received:', message)

              setMessages(oldMessages =>
                oldMessages.map(oldMessage =>
                  oldMessage.entryId === message.entryId ? message : oldMessage,
                ),
              )
            },
          )
        onErrorSubscription.current = messagingEventEmitter.addListener(
          'onError',
          (state: CoreError) => {
            // console.log('onNetworkStatusChanged:', state)
            setError(state)
          },
        )
        onNetworkStatusChangedSubscription.current =
          messagingEventEmitter.addListener(
            'onNetworkStatusChanged',
            (state: NetworkState) => {
              // console.log('onNetworkStatusChanged:', state)
              setNetworkStatus(state)
            },
          )
        onConnectionStatusChangedSubscription.current =
          messagingEventEmitter.addListener(
            'onConnectionStatusChanged',
            (state: ConnectionState) => {
              // console.log('onNetworkStatusChanged:', state)
              setConnectionStatus(state)
            },
          )
        onTypingStartedSubscription.current = messagingEventEmitter.addListener(
          'onTypingStarted',
          (message: ConversationEntry) => {
            // console.log('Started typing:', message)

            setIsTyping(message)
          },
        )
        onTypingStoppedSubscription.current = messagingEventEmitter.addListener(
          'onTypingStopped',
          (_message: ConversationEntry) => {
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
