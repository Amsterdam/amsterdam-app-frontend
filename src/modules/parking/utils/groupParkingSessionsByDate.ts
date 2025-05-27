import {ParkingSession, VisitorParkingSession} from '@/modules/parking/types'
import {compareParkingSessionsByStartDateTime} from '@/modules/parking/utils/compareParkingSessionsByStartDateTime'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export type ParkingSessionOrDummy =
  | ((ParkingSession | VisitorParkingSession) & {dummy?: never})
  | {dummy: true; ps_right_id: number; start_date_time: string}

export type Section = {
  data: Array<ParkingSessionOrDummy>
  title: string
}

export const dummyTitle = 'dummy'

export const groupParkingSessionsByDate = (
  parkingSessions: Array<ParkingSessionOrDummy> | undefined,
  sortAscending: boolean,
) =>
  [...(parkingSessions ?? [])]
    .sort((a, b) =>
      a.dummy || b.dummy
        ? 0
        : sortAscending
          ? compareParkingSessionsByStartDateTime(a, b)
          : compareParkingSessionsByStartDateTime(b, a),
    )
    .reduce<Section[]>((result, session) => {
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
