import dayjs, {Dayjs} from 'dayjs'
import 'dayjs/locale/nl'
import {holidays, visitingHours} from '@/modules/contact/data'

dayjs.locale('nl')

export enum Preposition {
  from = 'vanaf',
  until = 'tot',
}

type ReturnType = {
  dayName?: string
  preposition: Preposition
  time24hr: string
  time12hr: string
}

export const getVisitingState = (date: Dayjs = dayjs()): ReturnType => {
  let offset = 0

  while (true) {
    const candidate = date.startOf('d').add(offset, 'd')

    const candidateVisitingHours = visitingHours.find(
      ({closes, dayOfWeek}) =>
        candidate.day() === dayOfWeek &&
        !holidays.some(holiday => candidate.isSame(dayjs(holiday), 'd')) &&
        date.isBefore(
          candidate.startOf('m').hour(closes.hours).minute(closes.minutes),
        ),
    )

    if (candidateVisitingHours) {
      const {opens, closes} = candidateVisitingHours
      let {preposition, dayName, time} = {} as ReturnType & {time: Dayjs}

      if (candidate.isSame(date, 'd')) {
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
        dayName = offset === 1 ? undefined : candidate.format('dddd')
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
