import {useEffect, useState} from 'react'
import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native'
import type {Spec} from './NativeSalesforceMessagingInApp'
import type {CoreConfig, NativeSalesforceMessagingInApp} from './types'

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

let subscription: EmitterSubscription | null = null

export const createCoreClient = ({
  developerName,
  organizationId,
  url,
}: CoreConfig) =>
  SalesforceMessagingInApp.createCoreClient(url, organizationId, developerName)

let messages: unknown[] = []

export const createConversationClient = (sessionID?: string) => {
  if (subscription) {
    subscription.remove()
    subscription = null
  }

  messages = []
  subscription = messagingEventEmitter.addListener(
    'onNewMessage',
    (event: {message: string}) => {
      // console.log('New message received:', event.message)
      messages.push(event.message)
      // console.log(messages)
    },
  )

  return SalesforceMessagingInApp.createConversationClient(sessionID ?? null)
  /*.then(
    newSessionID => {


      return newSessionID
    },
  )*/
}

export const sendMessage = (message: string) =>
  SalesforceMessagingInApp.sendMessage(message)

export const retrieveRemoteConfiguration = () =>
  SalesforceMessagingInApp.retrieveRemoteConfiguration()

export const checkIfInBusinessHours = () =>
  SalesforceMessagingInApp.checkIfInBusinessHours()

export const useChat = ({
  developerName,
  organizationId,
  url,
  sessionID,
}: CoreConfig & {
  sessionID?: string
}) => {
  const [ready, setReady] = useState(false)
  const [newSessionID, setNewSessionID] = useState<string | undefined>(
    sessionID,
  )

  useEffect(() => {
    void createCoreClient({developerName, organizationId, url}).then(() => {
      void createConversationClient(newSessionID).then(
        (resultSessionID: string) => {
          setNewSessionID(resultSessionID)
        },
      )
      setReady(true)
    })

    return () => {
      // subscription?.remove()
    }
  }, [developerName, newSessionID, organizationId, url])

  return {ready, messages, sessionID: newSessionID}
}
