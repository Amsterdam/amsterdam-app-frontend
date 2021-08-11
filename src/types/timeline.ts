export type Timeline = {
  intro: string
  items: TimelineItem[]
}

export type TimelineItem = {
  title: string
  content: string
  status: 'current' | 'finished' | 'upcoming'
  subitems?: TimelineSubItem[]
}

type TimelineSubItem = Omit<TimelineItem, 'status'>
