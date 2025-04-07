import {dayjs} from '@/utils/datetime/dayjs'
import {days} from '@/utils/datetime/days'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'

describe('formatHistoryDateTime', () => {
  test('Some time today', () => {
    const date = dayjs().set('hour', 13).set('minute', 26)

    expect(formatHistoryDateTime(date)).toBe('13.26')
  })
  test('Some time yesterday', () => {
    const date = dayjs().add(-1, 'day')

    expect(formatHistoryDateTime(date)).toBe('gisteren')
  })
  test('Some time in the past 6 days', () => {
    const date = dayjs().add(-2, 'day')

    expect(formatHistoryDateTime(date)).toBe(days[date.get('day')])
  })
  test('Some time 7 days ago', () => {
    const date = dayjs().add(-7, 'day')

    expect(formatHistoryDateTime(date)).toBe(date.format('D MMMM'))
  })
})
