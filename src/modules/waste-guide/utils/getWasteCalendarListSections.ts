import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const getWasteCalendarListSections = (
  calendar: WasteGuideResponse['calendar'],
) => {
  // Group events by date
  const eventsByDate: Record<string, typeof calendar> = {}

  for (const event of calendar) {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = []
    }

    eventsByDate[event.date].push(event)
  }

  // Find events for today
  const today = dayjs().startOf('day')
  const eventsToday = eventsByDate[today.format('YYYY-MM-DD')] || []

  // Group by month, but each item is a date with all its events
  const dateGroups = Object.values(eventsByDate)
  const sections = dateGroups.reduce(
    (acc, events) => {
      const date = events[0].date
      const month = dayjs(date).locale('nl').format('MMMM YYYY')

      if (!acc[month]) {
        acc[month] = {title: month, data: []}
      }

      acc[month].data.push({date, events})

      return acc
    },
    {} as Record<
      string,
      {
        data: {date: string; events: typeof calendar}[]
        title: string
      }
    >,
  )

  return {sectionList: Object.values(sections), eventsToday, today}
}
