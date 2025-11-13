import {getDateForCostCalculation} from '@/modules/parking/utils/getDateForCostCalculation'
import {dayjs} from '@/utils/datetime/dayjs'

const NOW = dayjs('2025-11-13T10:00:00.000Z')
const END_TIME = dayjs('2025-11-13T12:00:00.000Z')

describe('getDateForCostCalculation', () => {
  it('returns endDate as endTime if no originalEndTime', () => {
    const result = getDateForCostCalculation({endTime: END_TIME, now: NOW})

    expect(result.endDate?.toISOString()).toBe('2025-11-13T12:00:00.000Z')
    expect(result.newDate).toBeNull()
    expect(result.diffMs).toBeNull()
    expect(result.isEndTimeBeforeOriginal).toBe(false)
  })

  it('returns correct diffMs and adds if endTime > originalEndTime', () => {
    const endTime = dayjs('2025-11-13T13:00:00.000Z')
    const originalEndTime = dayjs('2025-11-13T12:00:00.000Z')
    const result = getDateForCostCalculation({
      endTime,
      originalEndTime,
      now: NOW,
    })

    expect(result.diffMs).toBe(3600000)
    expect(result.isEndTimeBeforeOriginal).toBe(false)
    expect(result.newDate?.toISOString()).toBe('2025-11-13T11:00:00.000Z')
    expect(result.endDate?.toISOString()).toBe('2025-11-13T11:00:00.000Z')
  })

  it('returns correct diffMs and subtracts if endTime < originalEndTime', () => {
    const endTime = dayjs('2025-11-13T11:00:00.000Z')
    const originalEndTime = dayjs('2025-11-13T12:00:00.000Z')
    const result = getDateForCostCalculation({
      endTime,
      originalEndTime,
      now: NOW,
    })

    expect(result.diffMs).toBe(-3600000)
    expect(result.isEndTimeBeforeOriginal).toBe(true)
    expect(result.newDate?.toISOString()).toBe('2025-11-13T11:00:00.000Z')
    expect(result.endDate?.toISOString()).toBe('2025-11-13T11:00:00.000Z')
  })

  it('returns nulls if no endTime', () => {
    const result = getDateForCostCalculation({now: NOW})

    expect(result.diffMs).toBeNull()
    expect(result.newDate).toBeNull()
    expect(result.endDate).toBeUndefined()
    expect(result.isEndTimeBeforeOriginal).toBe(false)
  })
})
