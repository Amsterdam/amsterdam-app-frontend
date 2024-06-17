import {getDistance} from './getDistance'

describe('getDistance', () => {
  it('should return an empty object when either meter is not provided', () => {
    expect(getDistance()).toEqual({})
  })

  it('should return the distance in meters,  when meter is less than 5000', () => {
    const result = getDistance(2500)

    expect(result).toEqual({
      distanceText: '2500 meter',
      distanceA11yText: '2500 meter',
    })
  })

  it('should return the distance in kilometers, when meter is greater than or equal to 5000', () => {
    const result = getDistance(5000)

    expect(result).toEqual({
      distanceText: '5 km',
      distanceA11yText: '5 kilometer',
    })
  })

  it('should return the distance in kilometers, rounded to 1 decimal', () => {
    const result = getDistance(5678)

    expect(result).toEqual({
      distanceText: '5.7 km',
      distanceA11yText: '5.7 kilometer',
    })
  })
})
