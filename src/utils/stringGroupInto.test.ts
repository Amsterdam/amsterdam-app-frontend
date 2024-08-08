import {stringGroupInto} from '@/utils/stringGroupInto'

describe('stringGroupInto', () => {
  it('should group a string into n characters', () => {
    expect(stringGroupInto('123456', 2)).toBe('12 34 56')
  })
  it('should not group if n is 0', () => {
    expect(stringGroupInto('123456', 0)).toBe('123456')
  })
  it('should not group if n is null', () => {
    expect(stringGroupInto('123456', null as unknown as number)).toBe('123456')
  })
  it('should not group if n is undefined', () => {
    expect(stringGroupInto('123456', undefined as unknown as number)).toBe(
      '123456',
    )
  })
  it('should return an empty string if str was null', () => {
    expect(stringGroupInto(null as unknown as string, 0)).toBe('')
  })
  it('should return an empty string if str was undefined', () => {
    expect(stringGroupInto(undefined as unknown as string, 0)).toBe('')
  })
})
