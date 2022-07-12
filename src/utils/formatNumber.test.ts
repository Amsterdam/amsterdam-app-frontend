import {formatNumber} from './formatNumber'

describe('formatNumber', () => {
  it('should also show seconds if desired', () => {
    expect(formatNumber(123456789.01)).toEqual('123.456.789,01')
  })
  it('should not show seconds if desired', () => {
    expect(formatNumber(1.561)).toEqual('1,561')
  })
})
