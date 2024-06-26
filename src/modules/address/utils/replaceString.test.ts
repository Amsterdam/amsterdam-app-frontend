import {replaceString} from '@/modules/address/utils/replaceString'

describe('replaceString', () => {
  it('should remove invalid characters including # from address strings', () => {
    expect(replaceString('123 Main St., Apt #2!', 'address')).toBe(
      '123 Main St., Apt 2',
    )
    expect(replaceString('Baker’s Street 221B', 'address')).toBe(
      'Baker’s Street 221B',
    )
    expect(replaceString('4, Privet Drive/*', 'address')).toBe(
      '4, Privet Drive/',
    )
  })

  it('should remove non-alphanumeric characters from houseNumber strings', () => {
    expect(replaceString('AB-123', 'houseNumber')).toBe('AB-123')
    expect(replaceString('12 34!', 'houseNumber')).toBe('12 34')
    expect(replaceString('56-78?9', 'houseNumber')).toBe('56-789')
  })
})
