import {getVisitingState} from './getVisitingState'
import {day, visitingHours} from './getVisitingState.mock'
import {Preposition} from '@/types'
import {dayjs} from '@/utils'

const wrapGetVisitingState = (date: string, time: string) =>
  getVisitingState(visitingHours, dayjs(`${date}T${time}.000`))

describe('getVisitingState', () => {
  it('handles a Wednesday before opening time', () => {
    expect(wrapGetVisitingState(day.wednesday, '08:59:59')).toEqual({
      dayName: undefined,
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday after opening time', () => {
    expect(wrapGetVisitingState(day.wednesday, '09:00:00')).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Wednesday after regular closing time', () => {
    expect(wrapGetVisitingState(day.wednesday, '17:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday after late closing time', () => {
    expect(wrapGetVisitingState(day.wednesday, '20:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Thursday before opening time', () => {
    expect(wrapGetVisitingState(day.thursday, '08:59:59')).toEqual({
      dayName: undefined,
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Thursday after opening time', () => {
    expect(wrapGetVisitingState(day.thursday, '09:00:00')).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after regular closing time', () => {
    expect(wrapGetVisitingState(day.thursday, '17:00:00')).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '20.00',
      time12hr: '8:00',
    })
  })
  it('handles a Thursday after late closing time', () => {
    expect(wrapGetVisitingState(day.thursday, '20:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before opening time', () => {
    expect(wrapGetVisitingState(day.friday, '08:59:59')).toEqual({
      dayName: undefined,
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after opening time', () => {
    expect(wrapGetVisitingState(day.friday, '09:00:00')).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday after regular closing time', () => {
    expect(wrapGetVisitingState(day.friday, '17:00:00')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday after late closing time', () => {
    expect(wrapGetVisitingState(day.friday, '20:00:00')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday before opening time', () => {
    expect(wrapGetVisitingState(day.saturday, '08:59:59')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after opening time', () => {
    expect(wrapGetVisitingState(day.saturday, '09:00:00')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after regular closing time', () => {
    expect(wrapGetVisitingState(day.saturday, '17:00:00')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Saturday after late closing time', () => {
    expect(wrapGetVisitingState(day.saturday, '20:00:00')).toEqual({
      dayName: 'maandag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })

  it('handles a Sunday before opening time', () => {
    expect(wrapGetVisitingState(day.sunday, '08:59:59')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after opening time', () => {
    expect(wrapGetVisitingState(day.sunday, '09:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after regular closing time', () => {
    expect(wrapGetVisitingState(day.sunday, '17:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Sunday after late closing time', () => {
    expect(wrapGetVisitingState(day.sunday, '20:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday before opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeKingsDay}T08:59:59.000`),
      ),
    ).toEqual({
      dayName: undefined,
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday after opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeKingsDay}T09:00:00.000`),
      ),
    ).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles the day before a Wednesday holiday after regular closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeKingsDay}T17:00:00.000`),
      ),
    ).toEqual({
      dayName: 'donderdag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the day before a Wednesday holiday after late closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeKingsDay}T20:00:00.000`),
      ),
    ).toEqual({
      dayName: 'donderdag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday before opening time', () => {
    expect(wrapGetVisitingState(day.kingsDay, '08:59:59')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after opening time', () => {
    expect(wrapGetVisitingState(day.kingsDay, '09:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after regular closing time', () => {
    expect(wrapGetVisitingState(day.kingsDay, '17:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Wednesday holiday after late closing time', () => {
    expect(wrapGetVisitingState(day.kingsDay, '20:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday before opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeChristmas}T08:59:59.000`),
      ),
    ).toEqual({
      dayName: undefined,
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after opening time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeChristmas}T09:00:00.000`),
      ),
    ).toEqual({
      dayName: undefined,
      preposition: Preposition.until,
      time24hr: '17.00',
      time12hr: '5:00',
    })
  })
  it('handles a Friday before a Monday holiday after regular closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeChristmas}T17:00:00.000`),
      ),
    ).toEqual({
      dayName: 'dinsdag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Friday before a Monday holiday after late closing time', () => {
    expect(
      getVisitingState(
        visitingHours,
        dayjs(`${day.beforeChristmas}T20:00:00.000`),
      ),
    ).toEqual({
      dayName: 'dinsdag',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday before opening time', () => {
    expect(wrapGetVisitingState(day.christmasDay, '08:59:59')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after opening time', () => {
    expect(wrapGetVisitingState(day.christmasDay, '09:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after regular closing time', () => {
    expect(wrapGetVisitingState(day.christmasDay, '17:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles a Monday holiday after late closing time', () => {
    expect(wrapGetVisitingState(day.christmasDay, '20:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just before DST starts', () => {
    expect(wrapGetVisitingState(day.dstStart, '01:59:59')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just when DST starts', () => {
    expect(wrapGetVisitingState(day.dstStart, '03:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just before DST ends', () => {
    expect(wrapGetVisitingState(day.dstEnd, '01:59:59')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
  it('handles the Sunday just when DST ends', () => {
    expect(wrapGetVisitingState(day.dstEnd, '02:00:00')).toEqual({
      dayName: 'morgen',
      preposition: Preposition.from,
      time24hr: '09.00',
      time12hr: '9:00',
    })
  })
})
