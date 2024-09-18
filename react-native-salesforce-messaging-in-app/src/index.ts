import {NativeModules, Platform} from 'react-native'
import type {Spec} from './NativeSalesforceMessagingInApp'
import type {
  NativeCoreClient,
  CoreConfig,
  CoreClient,
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
      require('@/NativeSalesforceMessagingInApp') as {
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

export const multiply = (a: number, b: number): Promise<number> =>
  SalesforceMessagingInApp.multiply(a, b)

const createConversationClient = (
  client: NativeCoreClient,
  sessionID: string,
) => {
  const conversationClient = client.createConversationClient(sessionID)

  return {
    sendMessage: (text: string) => conversationClient.sendMessage(text),
  }
}

export const createCoreClient = (config: CoreConfig): CoreClient => {
  const client = SalesforceMessagingInApp.createCoreClient(config)

  return {
    start: () => client.start(),
    createConversationClient: (sessionID: string) => {
      createConversationClient(client, sessionID)
    },
    retrieveRemoteConfiguration: () => client.retrieveRemoteConfiguration(),
  }
}
