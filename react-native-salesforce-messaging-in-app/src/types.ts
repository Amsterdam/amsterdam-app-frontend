
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
  createConversationClient: (sessionID: string | null) => Promise<string>
  createCoreClient: (
    url: string,
    organizationId: string,
    developerName: string,
  ) => Promise<void>
  retrieveRemoteConfiguration: () => Promise<RemoteConfiguration>
  sendMessage: (text: string) => Promise<void>
}
