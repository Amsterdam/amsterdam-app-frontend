import {ModuleClientConfig} from '../types'
import {ReportProblemStack} from './Stack'

export const module: ModuleClientConfig = {
  linking: {},
  name: 'ReportProblemModule',
  slug: 'report-problem',
  stack: ReportProblemStack,
  state: [],
}
