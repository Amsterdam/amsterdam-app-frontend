import {compareParkingSessionsByStartDateTime} from '@/modules/parking/utils/compareParkingSessionsByStartDateTime'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export const dummyTitle = 'dummy'

export type Section<T> = {
  data: Array<T>
  title: string
}

export const groupParkingSessionsByDate = <
  T extends {dummy?: boolean; start_date_time: string},
>(
  parkingSessions: Array<T> | undefined,
  sortAscending: boolean,
): Section<T>[] =>
  [...(parkingSessions ?? [])]
    .sort((a, b) =>
      a.dummy || b.dummy
        ? 0
        : sortAscending
          ? compareParkingSessionsByStartDateTime(a, b)
          : // eslint-disable-next-line sonarjs/arguments-order
            compareParkingSessionsByStartDateTime(b, a),
    )
    .reduce<Section<T>[]>((result, session) => {
      const date = session.dummy
        ? dummyTitle
        : formatDateToDisplay(session.start_date_time, false)
      const section = result.find(s => s.title === date)

      if (section) {
        section.data.push(session)
      } else {
        result.push({title: date, data: [session]})
      }

      return result
    }, [])
