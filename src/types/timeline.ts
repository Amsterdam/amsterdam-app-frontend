import {RichText} from '@/types/section'

export type Timeline = {
  intro?: RichText
  items?: TimelineItem[]
  title?: RichText
}

type TimeLineContent = {
  body: RichText
  title: string
}

export type TimelineItem = {
  collapsed: boolean
  content: TimeLineContent[]
  progress: 'Afgelopen' | 'Huidig' | 'Aankomend'
  subitems?: TimelineSubItem[]
  title: string
}

type TimelineSubItem = Omit<TimelineItem, 'status'>
