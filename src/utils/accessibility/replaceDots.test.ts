import {replaceDots} from './replaceDots'

test(`empty string`, () => expect(replaceDots('')).toBe(''))

//@ts-ignore
test(`string with dots`, () =>
  expect(replaceDots('guus.dijkhuis@amsterdam.nl')).toBe(
    'guus punt dijkhuis@amsterdam punt nl',
  ))

test(`string without dots`, () => expect(replaceDots('text')).toBe('text'))
