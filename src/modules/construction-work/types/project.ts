import {ViewProps} from 'react-native'
import {
  ProjectContact,
  ProjectSection,
  ProjectTimeline,
} from '@/modules/construction-work/types/api'

export type ProjectSegment = {
  contacts?: ProjectContact[] | null
  sections?: ProjectSection[] | null
  testID: ViewProps['testID']
  timeline?: ProjectTimeline | null
  title: string
}
