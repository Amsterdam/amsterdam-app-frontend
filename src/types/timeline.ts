import {RichText} from './section'

export type Timeline = {
  intro: RichText
  items: TimelineItem[]
  title: RichText
}

export type TimelineItem = {
  collapsed: boolean
  content: RichText
  progress: 'Afgelopen' | 'Huidig' | 'Toekomst'
  subitems?: TimelineSubItem[]
  title: RichText
}

type TimelineSubItem = Omit<TimelineItem, 'status'>
