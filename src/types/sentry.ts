export enum BreadcrumbCategory {
  default = 'default',
  internetConnection = 'internetConnection',
}

export type CaptureBreadcrumb = (
  message?: string,
  data?: Record<string, unknown>,
  category?: BreadcrumbCategory,
) => void

export type SendErrorLog = (
  message: string,
  filename: string,
  data?: Record<string, unknown>,
) => void

export type SentryHandler = {
  captureSentryBreadcrumb: CaptureBreadcrumb
  sendSentryErrorLog: SendErrorLog
}
