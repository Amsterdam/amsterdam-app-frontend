export type NativeCoreClient = {
  createConversationClient: (sessionID: string) => {
    sendMessage: (text: string) => void
  }
  retrieveRemoteConfiguration: () => RemoteConfiguration
  start: () => void
}

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

export type CoreClient = {
  createConversationClient: (sessionID: string) => void
  retrieveRemoteConfiguration: () => RemoteConfiguration
  start: () => void
}

export type NativeSalesforceMessagingInApp = {
  createCoreClient: (config: CoreConfig) => NativeCoreClient
  multiply: (a: number, b: number) => Promise<number>
}
