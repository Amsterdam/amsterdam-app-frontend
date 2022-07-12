import {formatTime} from './formatTime'

describe('formatTime', () => {
  it('should also show seconds if desired', () => {
    expect(formatTime('01-01-2022 16:30:12', true)).toEqual('16:30:12')
  })
  it('should not show seconds if desired', () => {
    expect(formatTime('01-01-2022 16:30:12', false)).toEqual('16:30')
  })
})
