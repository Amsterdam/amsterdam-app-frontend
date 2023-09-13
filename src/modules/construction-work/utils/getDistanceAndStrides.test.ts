import {getDistanceAndStrides} from './getDistanceAndStrides'

describe('getDistanceAndStrides', () => {
  it('should return an empty object when either meter or strides is not provided', () => {
    const result1 = getDistanceAndStrides()
    const result2 = getDistanceAndStrides(1000)
    const result3 = getDistanceAndStrides(undefined, 500)

    expect(result1).toEqual({})
    expect(result2).toEqual({})
    expect(result3).toEqual({})
  })

  it('should return the distance in meters, with strides, when meter is less than 5000', () => {
    const result = getDistanceAndStrides(2500, 100)

    expect(result).toEqual({
      distanceText: '2500 meter',
      distanceA11yText: '2500 meter',
      stridesText: '100 stappen',
    })
  })

  it('should return the distance in kilometers, without strides, when meter is greater than or equal to 5000', () => {
    const result = getDistanceAndStrides(5000, 200)

    expect(result).toEqual({
      distanceText: '5 km',
      distanceA11yText: '5 kilometer',
    })
  })

  it('should return the distance in kilometers, rounded to 1 decimal', () => {
    const result = getDistanceAndStrides(5678, 1)

    expect(result).toEqual({
      distanceText: '5.7 km',
      distanceA11yText: '5.7 kilometer',
    })
  })
})
