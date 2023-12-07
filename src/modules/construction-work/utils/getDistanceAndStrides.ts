import round from 'lodash/round'
import simplur from 'simplur'

export const getDistanceAndStrides = (
  meter?: number | null,
  strides?: number | null,
) => {
  if (!meter || !strides) {
    return {}
  }

  if (meter >= 5000) {
    const distanceInKm = round(meter / 1000, 1)

    return {
      distanceA11yText: `${distanceInKm} kilometer`,
      distanceText: `${distanceInKm} km`,
    }
  }

  const distanceText = `${meter} meter`

  return {
    distanceA11yText: distanceText,
    distanceText,
    stridesText: simplur`${strides} stap[|pen]`,
  }
}
