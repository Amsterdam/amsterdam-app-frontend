import {stringGroupInto} from './stringGroupInto'

describe('stringGroupInto', () => {
  it('should group a string into n characters', () => {
    expect(stringGroupInto('123456', 2)).toBe('12 34 56')
  })
  it('should not group if n is 0', () => {
    expect(stringGroupInto('123456', 0)).toBe('123456')
  })
})
