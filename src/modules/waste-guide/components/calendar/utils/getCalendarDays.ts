import {dayjs} from '@/utils/datetime/dayjs'

export const getCalendarDays = () => {
  const today = dayjs()
  // 1. Days from Monday of this week up to and including today
  const startOfWeek = today.startOf('week') // Monday
  const daysBeforeToday: ReturnType<typeof dayjs>[] = []
  let d = startOfWeek.clone()

  while (d.isBefore(today, 'day')) {
    daysBeforeToday.push(d.clone())
    d = d.add(1, 'day')
  }

  // 2. 42 days from today (including today)
  const daysFromToday: ReturnType<typeof dayjs>[] = []

  for (let i = 0; i < 42; i++) {
    daysFromToday.push(today.add(i, 'day'))
  }

  // 3. Pad to Sunday at the end (0 = Sunday)
  const lastDay = daysFromToday[daysFromToday.length - 1]
  const daysAfter = []
  let after = lastDay.clone()

  while (after.day() !== 0) {
    after = after.add(1, 'day')
    daysAfter.push(after.clone())
  }

  // Combine all
  return [...daysBeforeToday, ...daysFromToday, ...daysAfter]
}
