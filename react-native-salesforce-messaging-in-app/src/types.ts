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
