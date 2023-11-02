import {addressPronounce} from './addressPronounce'

describe('Address pronounce', () => {
  it(`empty string`, () => expect(addressPronounce('')).toBe(''))
  it(`no number`, () =>
    expect(addressPronounce('Herengracht')).toBe('Herengracht'))
  it(`no number / comma`, () =>
    expect(addressPronounce('Herengracht,')).toBe('Herengracht,'))
  it(`street with space`, () =>
    expect(addressPronounce('Nieuwe Herengracht')).toBe('Nieuwe Herengracht'))
  it(`[number]`, () =>
    expect(addressPronounce('Herengracht 3')).toBe('Herengracht 3'))
  it(`[number]-[alphanummeric]`, () =>
    expect(addressPronounce('Herengracht 3-H')).toBe('Herengracht 3-H'))
  it(`[number]-[number]`, () =>
    expect(addressPronounce('Herengracht 3-2')).toBe('Herengracht 3, 2 hoog'))
  it(`[number][alphanummeric]-[number]`, () =>
    expect(addressPronounce('Herengracht 412A-3')).toBe(
      'Herengracht 412-A, 3 hoog',
    ))
  it(`[number][alphanummeric]`, () =>
    expect(addressPronounce('Herengracht 3H')).toBe('Herengracht 3-H'))
  it('handles the only numbers situation', () => {
    expect(addressPronounce('3-2')).toBe('3, 2 hoog')
    expect(addressPronounce('iets3-2')).toBe('iets3-2')
  })
})
