import {formatEnumeration} from '@/utils/formatEnumeration'

describe('formatEnumeration', () => {
  it('3 items', () => {
    expect(formatEnumeration('Maandag, woensdag, vrijdag')).toEqual(
      'Maandag, woensdag en vrijdag',
    )
  })
  it('2 items', () => {
    expect(formatEnumeration('Maandag, vrijdag')).toEqual('Maandag en vrijdag')
  })
  it('1 item', () => {
    expect(formatEnumeration('Maandag')).toEqual('Maandag')
  })
  it('passed null', () => {
    expect(formatEnumeration(null)).toEqual(null)
  })
})
