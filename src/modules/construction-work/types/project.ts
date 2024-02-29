import {type TestProps} from '@/components/ui/types'
import {
  ProjectContact,
  ProjectSection,
  ProjectTimeline,
} from '@/modules/construction-work/types/api'

export type ProjectSegment = {
  contacts?: ProjectContact[] | null
  sections?: ProjectSection[] | null
  timeline?: ProjectTimeline | null
  title: string
} & TestProps
