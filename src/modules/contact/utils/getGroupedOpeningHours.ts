import {VisitingHour} from '@/modules/contact/types'
import {dayjs} from '@/utils/datetime/dayjs'

const dayNames = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag']

const groupByOpeningHours = (visitingHours: VisitingHour[]) => {
  const groups: Record<string, number[]> = {}

  visitingHours.forEach(hour => {
    const key = `${hour.opening.hours}:${hour.opening.minutes}-${hour.closing.hours}:${hour.closing.minutes}`

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(hour.dayOfWeek)
  })

  return groups
}

const formatTime = (h: number, m: number) =>
  dayjs().hour(h).minute(m).format('HH.mm')

const joinDays = (days: number[]) => {
  const names = days.map(d => dayNames[d - 1])

  if (names.length === 1) {
    return names[0][0].toUpperCase() + names[0].slice(1)
  }

  if (names.length === 2) {
    return names[0][0].toUpperCase() + names[0].slice(1) + ' en ' + names[1]
  }

  return (
    names
      .slice(0, -1)
      .map((n, i) => (i === 0 ? n[0].toUpperCase() + n.slice(1) : n))
      .join(', ') +
    ' en ' +
    names[names.length - 1]
  )
}

export const getGroupedOpeningHours = (visitingHours: VisitingHour[]) => {
  const groups = groupByOpeningHours(visitingHours)

  return Object.entries(groups).map(([key, days]) => {
    const [open, close] = key.split('-')
    const [openH, openM] = open.split(':').map(Number)
    const [closeH, closeM] = close.split(':').map(Number)

    return `${joinDays(days)} van ${formatTime(openH, openM)} tot ${formatTime(closeH, closeM)} uur`
  })
}
