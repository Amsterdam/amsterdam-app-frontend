export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
  reportProblemWebView = 'ReportProblemWebView',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
  [ReportProblemRouteName.reportProblemWebView]: undefined
}

export enum ReportProblemModalName {}

export type ReportProblemModalParams = Record<string, never>
