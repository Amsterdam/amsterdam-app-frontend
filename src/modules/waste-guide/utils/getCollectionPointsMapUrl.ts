import {Address} from '@/modules/address/types'

export const getCollectionPointsMapUrl = (
  wasteCollectionPointsUrl: string,
  coordinates?: Address['coordinates'],
) => {
  const {lon = 0, lat = 0} = coordinates ?? {}
  const location = `${lat.toFixed(5)}/${lon.toFixed(5)}`
  const center = `${lat.toFixed(5)},${lon.toFixed(5)}`

  return `${wasteCollectionPointsUrl}/#13/${location}/brt/14324///${center}`
}
