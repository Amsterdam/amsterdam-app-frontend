import {replaceDots} from './replaceDots'

describe('replaceDots', () => {
  it(`empty string`, () => expect(replaceDots('')).toBe(''))

  it(`string with dots`, () =>
    expect(replaceDots('guus.dijkhuis@amsterdam.nl')).toBe(
      'guus punt dijkhuis@amsterdam punt nl',
    ))

  it(`string without dots`, () => expect(replaceDots('text')).toBe('text'))
})
