import dayjs, {Dayjs} from 'dayjs'
import 'dayjs/locale/nl'
import {holidays, visitingHours} from '@/modules/contact/data'

dayjs.locale('nl')

export enum Preposition {
  from = 'vanaf',
  until = 'tot',
}

type VisitingState = {
  dayName?: string
  preposition: Preposition
  time24hr: string
  time12hr: string
}

export const getVisitingState = (date: Dayjs = dayjs()): VisitingState => {
  for (let offset = 0; offset <= 31; offset++) {
    const candidate = date.startOf('day').add(offset, 'day')

    const candidateVisitingHours = visitingHours.find(
      ({closing, dayOfWeek}) =>
        candidate.day() === dayOfWeek &&
        !holidays.some(holiday => candidate.isSame(dayjs(holiday), 'day')) &&
        date.isBefore(
          candidate
            .startOf('minute')
            .hour(closing.hours)
            .minute(closing.minutes),
        ),
    )

    if (candidateVisitingHours) {
      const {opening, closing} = candidateVisitingHours
      let {preposition, dayName, time} = {} as VisitingState & {time: Dayjs}

      if (candidate.isSame(date, 'day')) {
        const candidateOpeningTime = candidate
          .startOf('minute')
          .hour(opening.hours)
          .minute(opening.minutes) // of beter nog eigenlijk de losse functie die ik hierboven suggereerde
        if (date.isBefore(candidateOpeningTime)) {
          preposition = Preposition.from
          time = candidateOpeningTime
        } else {
          preposition = Preposition.until
          time = candidate.hour(closing.hours).minute(closing.minutes)
        }
      } else {
        dayName =
          candidate.diff(date.startOf('day'), 'day') === 1
            ? 'morgen'
            : candidate.format('dddd')
        preposition = Preposition.from
        time = candidate.hour(opening.hours).minute(opening.minutes)
      }

      return {
        preposition,
        dayName,
        time24hr: time.format('HH.mm'),
        time12hr: time.format('h:mm'),
      }
    }
  }

  return {} as VisitingState
}
