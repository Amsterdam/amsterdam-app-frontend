import {getVisitingState} from './getVisitingState'
import {visitingHours} from '@/modules/contact/data'
import {Preposition} from '@/types'
import {dayjs} from '@/utils'

// Test data: various days of the week and some holidays.
const d = {
  wednesday: '2022-08-31',
  thursday: '2022-09-01',
  friday: '2022-09-02',
  saturday: '2022-09-03',
  sunday: '2022-09-04',
  beforeKingsDay: '2022-04-26',
  kingsDay: '2022-04-27',
  beforeChristmas: '2022-12-23',
  christmasDay: '2022-12-26',
  dstStart: '2022-03-27',
  dstEnd: '2022-10-30',
}

const wrapGetVisitingState = (date: string, time: string) =>
  getVisitingState(visitingHours, dayjs(`${date}T${time}.000`))

describe('getVisitingState', () => {
  it('handles a Wednesday before opening time', () => {
    expect(wrapGetVisitingState(d.wednesday, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday after opening time', () => {
    expect(wrapGetVisitingState(d.wednesday, '09:00:00')).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Wednesday after regular closing time', () => {
    expect(wrapGetVisitingState(d.wednesday, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday after late closing time', () => {
    expect(wrapGetVisitingState(d.wednesday, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Thursday before opening time', () => {
    expect(wrapGetVisitingState(d.thursday, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Thursday after opening time', () => {
    expect(wrapGetVisitingState(d.thursday, '09:00:00')).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after regular closing time', () => {
    expect(wrapGetVisitingState(d.thursday, '17:00:00')).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after late closing time', () => {
    expect(wrapGetVisitingState(d.thursday, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before opening time', () => {
    expect(wrapGetVisitingState(d.friday, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after opening time', () => {
    expect(wrapGetVisitingState(d.friday, '09:00:00')).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday after regular closing time', () => {
    expect(wrapGetVisitingState(d.friday, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after late closing time', () => {
    expect(wrapGetVisitingState(d.friday, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday before opening time', () => {
    expect(wrapGetVisitingState(d.saturday, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after opening time', () => {
    expect(wrapGetVisitingState(d.saturday, '09:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after regular closing time', () => {
    expect(wrapGetVisitingState(d.saturday, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after late closing time', () => {
    expect(wrapGetVisitingState(d.saturday, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'maandag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })

  it('handles a Sunday before opening time', () => {
    expect(wrapGetVisitingState(d.sunday, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after opening time', () => {
    expect(wrapGetVisitingState(d.sunday, '09:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after regular closing time', () => {
    expect(wrapGetVisitingState(d.sunday, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after late closing time', () => {
    expect(wrapGetVisitingState(d.sunday, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday before opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeKingsDay}T08:59:59.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday after opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeKingsDay}T09:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles the day before a Wednesday holiday after regular closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeKingsDay}T17:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: 'donderdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday after late closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeKingsDay}T20:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: 'donderdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday before opening time', () => {
    expect(wrapGetVisitingState(d.kingsDay, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after opening time', () => {
    expect(wrapGetVisitingState(d.kingsDay, '09:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after regular closing time', () => {
    expect(wrapGetVisitingState(d.kingsDay, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after late closing time', () => {
    expect(wrapGetVisitingState(d.kingsDay, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday before opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeChristmas}T08:59:59.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: undefined,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeChristmas}T09:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.until,
      dayName: undefined,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday before a Monday holiday after regular closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeChristmas}T17:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: 'dinsdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after late closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${d.beforeChristmas}T20:00:00.000`),
      ),
    ).toEqual({
      preposition: Preposition.from,
      dayName: 'dinsdag',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday before opening time', () => {
    expect(wrapGetVisitingState(d.christmasDay, '08:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after opening time', () => {
    expect(wrapGetVisitingState(d.christmasDay, '09:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after regular closing time', () => {
    expect(wrapGetVisitingState(d.christmasDay, '17:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after late closing time', () => {
    expect(wrapGetVisitingState(d.christmasDay, '20:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just before DST starts', () => {
    expect(wrapGetVisitingState(d.dstStart, '01:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just when DST starts', () => {
    expect(wrapGetVisitingState(d.dstStart, '03:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just before DST ends', () => {
    expect(wrapGetVisitingState(d.dstEnd, '01:59:59')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just when DST ends', () => {
    expect(wrapGetVisitingState(d.dstEnd, '02:00:00')).toEqual({
      preposition: Preposition.from,
      dayName: 'morgen',
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
})
