import {formatNumber} from '@/utils/formatNumber'

describe('formatNumber', () => {
  it('should also show seconds if desired', () => {
    const largeNumber = 123456789.01

    expect(formatNumber(largeNumber)).toEqual('123.456.789,01')
  })
  it('should not show seconds if desired', () => {
    const numberWithoutSeconds = 1.561

    expect(formatNumber(numberWithoutSeconds)).toEqual('1,561')
  })
  it('should work for currencies', () => {
    const amount = 1.561

    expect(formatNumber(amount, 'EUR')).toEqual('€\u00A01,56')
  })
  it('should work for undefined', () => {
    expect(formatNumber(undefined as unknown as number)).toEqual('0')
    expect(formatNumber(null as unknown as number)).toEqual('0')
  })
})
