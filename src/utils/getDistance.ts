// Haversine formula to calculate distance in meters between two lat/lon points
export const getDistance = (
  a: {lat: number; lon: number},
  b: {lat: number; lon: number},
) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371000 // meters
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const x = dLon * Math.cos((lat1 + lat2) / 2)
  const y = dLat

  return Math.round(Math.sqrt(x * x + y * y) * R)
}
