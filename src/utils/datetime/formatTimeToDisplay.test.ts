import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

describe('formatTimeToDisplay', () => {
  it('should work with a full date', () => {
    expect(formatTimeToDisplay('2023-10-01T12:00:00Z')).toEqual('11.00')
  })
  it('should work with only a time', () => {
    expect(formatTimeToDisplay('12:00:00')).toEqual('12.00')
  })
})
