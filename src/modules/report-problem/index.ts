import {ClientModule} from '../types'
import {ReportProblemStack} from './Stack'

export const module: ClientModule = {
  linking: {},
  name: 'ReportProblemModule',
  slug: 'report-problem',
  stack: ReportProblemStack,
  state: [],
}
