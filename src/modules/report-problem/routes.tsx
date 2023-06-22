export enum ReportProblemRouteName {
  reportProblemWebView = 'ReportProblemWebView',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.reportProblemWebView]: undefined
}

export enum ReportProblemModalName {}

export type ReportProblemModalParams = Record<string, never>
