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

export const retrieveRemoteConfiguration = () =>
  SalesforceMessagingInApp.retrieveRemoteConfiguration()

export const checkIfInBusinessHours = () =>
  SalesforceMessagingInApp.checkIfInBusinessHours()

export const useCreateChat = ({
  developerName,
  organizationId,
  url,
  conversationId,
}: CoreConfig & {
  conversationId?: string
}) => {
  const [ready, setReady] = useState(false)
  const [newConversationId, setNewConversationId] = useState<
    string | undefined
  >(conversationId)
  const onNewMessageSubscription = useRef<EmitterSubscription | null>(null)
  const onUpdatedMessageSubscription = useRef<EmitterSubscription | null>(null)
  const onNetworkStatusChangedSubscription = useRef<EmitterSubscription | null>(
    null,
  )
  const onTypingStartedSubscription = useRef<EmitterSubscription | null>(null)
  const onTypingStoppedSubscription = useRef<EmitterSubscription | null>(null)
  const [messages, setMessages] = useState<ConversationEntry[]>([])
  const [isTyping, setIsTyping] = useState<ConversationEntry | false>(false)
  const [networkStatus, setNetworkStatus] = useState<ConversationEntry | null>(
    null,
  )
  const [participants, setParticipants] = useState<Participant[]>([])
  const employeeInChat = useMemo(
    () =>
      participants.some(
        participant =>
          participant.role === ConversationEntrySenderRole.employee,
      ),
    [participants],
  )

  useEffect(() => {
    if (developerName && organizationId && url) {
      setParticipants([])
      setMessages([])
      void createCoreClient({developerName, organizationId, url}).then(() => {
        if (onNewMessageSubscription.current) {
          onNewMessageSubscription.current.remove()
          onNewMessageSubscription.current = null
        }

        if (onUpdatedMessageSubscription.current) {
          onUpdatedMessageSubscription.current.remove()
          onUpdatedMessageSubscription.current = null
        }

        if (onNetworkStatusChangedSubscription.current) {
          onNetworkStatusChangedSubscription.current?.remove()
          onNetworkStatusChangedSubscription.current = null
        }

        if (onTypingStartedSubscription.current) {
          onTypingStartedSubscription.current?.remove()
          onTypingStartedSubscription.current = null
        }

        if (onTypingStoppedSubscription.current) {
          onTypingStoppedSubscription.current?.remove()
          onTypingStoppedSubscription.current = null
        }

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
        onNetworkStatusChangedSubscription.current =
          messagingEventEmitter.addListener(
            'onNetworkStatusChanged',
            (message: ConversationEntry) => {
              // console.log('New message received:', event)
              setNetworkStatus(message)
              // console.log(JSON.stringify(messages))
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
      onNewMessageSubscription.current?.remove()
      onNewMessageSubscription.current = null
      onUpdatedMessageSubscription.current?.remove()
      onUpdatedMessageSubscription.current = null
      onNetworkStatusChangedSubscription.current?.remove()
      onNetworkStatusChangedSubscription.current = null
      onTypingStartedSubscription.current?.remove()
      onTypingStartedSubscription.current = null
      onTypingStoppedSubscription.current?.remove()
      onTypingStoppedSubscription.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, developerName, organizationId, url])

  return {
    conversationId: newConversationId,
    isTyping,
    messages,
    networkStatus,
    ready,
    participants,
    employeeInChat,
  }
}
