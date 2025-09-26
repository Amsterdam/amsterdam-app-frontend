import {
  FractionCode,
  WasteGuideCalendarEvent,
} from '@/modules/waste-guide/types'

export const getCalendarEventsByDate = (
  calendar: WasteGuideCalendarEvent[],
) => {
  const eventsByDate: Record<string, FractionCode[]> = {}

  if (calendar) {
    for (const event of calendar) {
      const dateStr = event.date

      if (!eventsByDate[dateStr]) {
        eventsByDate[dateStr] = []
      }

      eventsByDate[dateStr].push(event.code)
    }
  }

  return eventsByDate
}
