export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
}

export enum ReportProblemModalName {}

export type ReportProblemModalParams = Record<string, never>
