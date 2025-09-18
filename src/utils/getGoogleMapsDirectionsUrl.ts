// Returns a Google Maps directions or search URL from address coordinates to polling station position
export const getGoogleMapsDirectionsUrl = (
  from?: {lat: number; lon: number},
  to?: {lat: number; lon: number},
) => {
  if (from && to) {
    return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lon}&destination=${to.lat},${to.lon}`
  }

  if (to) {
    return `https://www.google.com/maps/search/?api=1&query=${to.lat},${to.lon}`
  }

  return undefined
}
