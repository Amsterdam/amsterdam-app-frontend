import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

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
      const eventDate = dayjs(date)
      const isToday = eventDate.isSame(today, 'day')
      const month = eventDate.locale('nl').format('MMMM YYYY')

      if (!acc[month]) {
        acc[month] = {title: month, data: []}
      }

      acc[month].data.push({date, eventDate, isToday, events})

      return acc
    },
    {} as Record<
      string,
      {
        data: {
          date: string
          eventDate: Dayjs
          events: typeof calendar
          isToday: boolean
        }[]
        title: string
      }
    >,
  )

  return {sectionList: Object.values(sections), eventsToday, today}
}
