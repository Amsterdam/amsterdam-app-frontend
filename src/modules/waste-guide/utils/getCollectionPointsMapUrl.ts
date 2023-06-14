import {Address} from '@/modules/address'
import {WasteGuideUrl} from '@/modules/waste-guide/types'

// TODO: remove centroid once standardization of address data is done
export const getCollectionPointsMapUrl = (
  coordinates?: Address['coordinates'],
) => {
  if (!coordinates) {
    return
  }
  const {lon, lat} = coordinates
  const location = `${lat.toFixed(5)}/${lon.toFixed(5)}`
  const center = `${lat.toFixed(5)},${lon.toFixed(5)}`

  return `${WasteGuideUrl.collectionPointsUrl}/#13/${location}/brt/14324///${center}`
}
