import dayjs from 'dayjs'
import 'dayjs/locale/nl'
import {DayName, getVisitingState, Preposition} from './getVisitingState'

const regular = '2022-08-31'
const long = '2022-09-01'
const timezone = '.000+02:00'

describe('getVisitingState', () => {
  it('handles a regular working day before opening time', () => {
    expect(getVisitingState(dayjs(`${regular}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a regular working day after opening time', () => {
    expect(getVisitingState(dayjs(`${regular}T09:00:00${timezone}`))).toEqual({
      preposition: 'tot',
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a regular working day after regular closing time', () => {
    expect(getVisitingState(dayjs(`${regular}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: DayName.tomorrow,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a regular working day after late closing time', () => {
    expect(getVisitingState(dayjs(`${regular}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: DayName.tomorrow,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a long working day before opening time', () => {
    expect(getVisitingState(dayjs(`${long}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a long working day after opening time', () => {
    expect(getVisitingState(dayjs(`${long}T09:00:00${timezone}`))).toEqual({
      preposition: 'tot',
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a long working day after regular closing time', () => {
    expect(getVisitingState(dayjs(`${long}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a long working day after late closing time', () => {
    expect(getVisitingState(dayjs(`${long}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: DayName.tomorrow,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
})
