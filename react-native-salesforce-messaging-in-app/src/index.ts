import {NativeModules, Platform} from 'react-native'
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

// const createConversationClient = (
//   client: NativeCoreClient,
//   sessionID: string,
// ) => {
//   const conversationClient = client.createConversationClient(sessionID)

//   return {
//     sendMessage: (text: string) => conversationClient.sendMessage(text),
//   }
// }

export const createCoreClient = ({
  developerName,
  organizationId,
  url,
}: CoreConfig) =>
  SalesforceMessagingInApp.createCoreClient(url, organizationId, developerName)

export const createConversationClient = (sessionID?: string) =>
  SalesforceMessagingInApp.createConversationClient(sessionID ?? null)

export const sendMessage = (message: string) =>
  SalesforceMessagingInApp.sendMessage(message)

export const retrieveRemoteConfiguration = () =>
  SalesforceMessagingInApp.retrieveRemoteConfiguration()
