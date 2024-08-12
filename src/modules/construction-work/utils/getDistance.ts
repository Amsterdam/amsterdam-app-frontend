export const getDistance = (meter?: number | null) => {
  if (!meter) {
    return {}
  }

  if (meter >= 5000) {
    const distanceInKm = parseFloat((meter / 1000).toFixed(1))

    return {
      distanceA11yText: `${distanceInKm} kilometer`,
      distanceText: `${distanceInKm} km`,
    }
  }

  const distanceText = `${meter} meter`

  return {
    distanceA11yText: distanceText,
    distanceText,
  }
}
