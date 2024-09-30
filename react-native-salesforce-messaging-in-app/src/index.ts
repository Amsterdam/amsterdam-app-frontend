import {useEffect, useRef, useState} from 'react'
import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native'
import type {Spec} from './NativeSalesforceMessagingInApp'
import type {
  ConversationEntry,
  CoreConfig,
  NativeSalesforceMessagingInApp,
} from './types'

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
  const [messages, setMessages] = useState<ConversationEntry[]>([])

  useEffect(() => {
    if (developerName && organizationId && url) {
      void createCoreClient({developerName, organizationId, url}).then(() => {
        if (onNewMessageSubscription.current) {
          onNewMessageSubscription.current.remove()
          onNewMessageSubscription.current = null
        }

        if (onUpdatedMessageSubscription.current) {
          onUpdatedMessageSubscription.current.remove()
          onUpdatedMessageSubscription.current = null
        }

        // setMessages([])
        onNewMessageSubscription.current = messagingEventEmitter.addListener(
          'onNewMessage',
          (message: ConversationEntry) => {
            // console.log('New message received:', event)
            setMessages(oldMessages => [...oldMessages, message])
            // console.log(JSON.stringify(messages))
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
              // console.log(JSON.stringify(messages))
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, developerName, organizationId, url])

  return {ready, messages, conversationId: newConversationId}
}
