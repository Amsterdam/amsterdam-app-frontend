import {City} from '@/modules/report-problem/types'

export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
  reportProblemWebView = 'ReportProblemWebView',
}

export type ReportProblemStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
  [ReportProblemRouteName.reportProblemWebView]: {
    city: City
  }
}

export enum ReportProblemModalName {}

export type ReportProblemModalParams = Record<string, never>
