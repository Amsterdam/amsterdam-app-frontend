import dayjs from 'dayjs'
import 'dayjs/locale/nl'
import {getVisitingState, Preposition} from './getVisitingState'

const [wednesday, thursday, friday, saturday, sunday, holiday] = [
  '2022-08-31',
  '2022-09-01',
  '2022-09-02',
  '2022-09-03',
  '2022-09-04',
  '2022-12-23',
]
const timezone = '.000+02:00'

describe('getVisitingState', () => {
  it('handles a Wednesday before opening time', () => {
    expect(getVisitingState(dayjs(`${wednesday}T08:59:59${timezone}`))).toEqual(
      {
        preposition: Preposition.from,
        dayName: undefined,
        time24hr: '09.00',
        time12hr: '9:00',
      },
    )
  })
  it('handles a Wednesday after opening time', () => {
    expect(getVisitingState(dayjs(`${wednesday}T09:00:00${timezone}`))).toEqual(
      {
        preposition: 'tot',
        dayName: undefined,
        time24hr: '17.00',
        time12hr: '5:00',
      },
    )
  })
  it('handles a Wednesday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${wednesday}T17:00:00${timezone}`))).toEqual(
      {
        preposition: Preposition.from,
        dayName: undefined,
        time24hr: '09.00',
        time12hr: '9:00',
      },
    )
  })
  it('handles a Wednesday after late closing time', () => {
    expect(getVisitingState(dayjs(`${wednesday}T20:00:00${timezone}`))).toEqual(
      {
        preposition: Preposition.from,
        dayName: undefined,
        time24hr: '09.00',
        time12hr: '9:00',
      },
    )
  })
  it('handles a Thursday before opening time', () => {
    expect(getVisitingState(dayjs(`${thursday}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Thursday after opening time', () => {
    expect(getVisitingState(dayjs(`${thursday}T09:00:00${timezone}`))).toEqual({
      preposition: 'tot',
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${thursday}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after late closing time', () => {
    expect(getVisitingState(dayjs(`${thursday}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before opening time', () => {
    expect(getVisitingState(dayjs(`${friday}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after opening time', () => {
    expect(getVisitingState(dayjs(`${friday}T09:00:00${timezone}`))).toEqual({
      preposition: 'tot',
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${friday}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after late closing time', () => {
    expect(getVisitingState(dayjs(`${friday}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday before opening time', () => {
    expect(getVisitingState(dayjs(`${saturday}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after opening time', () => {
    expect(getVisitingState(dayjs(`${saturday}T09:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${saturday}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after late closing time', () => {
    expect(getVisitingState(dayjs(`${saturday}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })

  it('handles a Sunday before opening time', () => {
    expect(getVisitingState(dayjs(`${sunday}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after opening time', () => {
    expect(getVisitingState(dayjs(`${sunday}T09:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${sunday}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after late closing time', () => {
    expect(getVisitingState(dayjs(`${sunday}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday before opening time', () => {
    expect(getVisitingState(dayjs(`${holiday}T08:59:59${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after opening time', () => {
    expect(getVisitingState(dayjs(`${holiday}T09:00:00${timezone}`))).toEqual({
      preposition: 'tot',
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday before a Monday holiday after regular closing time', () => {
    expect(getVisitingState(dayjs(`${holiday}T17:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'dinsdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after late closing time', () => {
    expect(getVisitingState(dayjs(`${holiday}T20:00:00${timezone}`))).toEqual({
      preposition: Preposition.from,
      dayName: 'dinsdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
})
