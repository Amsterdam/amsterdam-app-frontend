import {ViewProps} from 'react-native'
import {
  ProjectDetailContact,
  ProjectDetailSection,
  ProjectDetailTimeline,
} from '@/modules/construction-work/types/api'

export type ProjectBody = {
  contacts?: ProjectDetailContact[]
  sections?: ProjectDetailSection[]
  testID?: ViewProps['testID']
  timeline?: ProjectDetailTimeline
  title: string
}
