import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

export const getCalendarEventsByDate = (
  calendar: WasteGuideCalendarEvent[],
) => {
  const eventsByDate: Record<string, WasteGuideCalendarEvent[]> = {}

  if (calendar) {
    for (const event of calendar) {
      const dateStr = event.date

      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = []
      }

      eventsByDate[dateStr].push(event)
    }
  }

  return eventsByDate
}
