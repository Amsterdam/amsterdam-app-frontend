import {ViewProps} from 'react-native'
import {
  ProjectDetailContact,
  ProjectDetailSection,
  ProjectDetailTimeline,
} from '@/modules/construction-work/types/api'

export type ProjectDetailSegment = {
  contacts?: ProjectDetailContact[] | null
  sections?: ProjectDetailSection[] | null
  testID: ViewProps['testID']
  timeline?: ProjectDetailTimeline | null
  title: string
}
