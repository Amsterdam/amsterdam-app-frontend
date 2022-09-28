import {toBeDeepCloseTo, toMatchCloseTo} from 'jest-matcher-deep-close-to'
import {coordinatesSquare} from './coordinatesSquare'

expect.extend({toBeDeepCloseTo, toMatchCloseTo})

describe('coordinatesSquare', () => {
  test('Weesperstraat 113 plus of min 0.01 graad', () => {
    expect(coordinatesSquare(52.3631, 4.9072, 0.01)).toBeDeepCloseTo(
      [52.3531, 4.8972, 52.3731, 4.9172],
      8,
    )
  })
  test('Weesperstraat 113 plus of min 0.00001 graad', () => {
    expect(coordinatesSquare(52.3631, 4.9072, 0.00001)).toBeDeepCloseTo(
      [52.36309, 4.90719, 52.36311, 4.90721],
      8,
    )
  })
})
