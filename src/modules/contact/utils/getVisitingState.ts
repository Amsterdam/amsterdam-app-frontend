import dayjs, {Dayjs} from 'dayjs'
import 'dayjs/locale/nl'
import {visitingHours} from '@/modules/contact/data'

dayjs.locale('nl')

export enum DayName {
  tomorrow = 'morgen',
}

export enum Preposition {
  from = 'vanaf',
  until = 'tot',
}

type ReturnType = {
  dayName?: DayName
  preposition: Preposition
  time24hr: string
  time12hr: string
}

export const getVisitingState = (date: Dayjs = dayjs()): ReturnType => {
  let offset = 0

  while (true) {
    const candidate = date.startOf('day').add(offset, 'day')

    const candidateVisitingHours = visitingHours.find(
      ({closes, dayOfWeek}) =>
        candidate.day() === dayOfWeek &&
        date.isBefore(
          candidate.startOf('m').hour(closes.hours).minute(closes.minutes),
        ),
    )

    if (candidateVisitingHours) {
      const {opens, closes} = candidateVisitingHours
      let {preposition, dayName, time} = {} as ReturnType & {time: Dayjs}

      if (candidate.isSame(date, 'day')) {
        if (
          date.isBefore(
            candidate.startOf('m').hour(opens.hours).minute(opens.minutes),
          )
        ) {
          preposition = Preposition.from
          time = candidate.hour(opens.hours).minute(opens.minutes)
        } else {
          preposition = Preposition.until
          time = candidate.hour(closes.hours).minute(closes.minutes)
        }
      } else {
        dayName = DayName.tomorrow
        preposition = Preposition.from
        time = candidate.hour(opens.hours).minute(opens.minutes)
      }

      return {
        preposition,
        dayName,
        time24hr: time.format('HH.mm'),
        time12hr: time.format('h:mm'),
      }
    }

    offset++
  }
}
