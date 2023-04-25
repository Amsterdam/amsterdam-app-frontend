// Remove once the waste guide API includes this as a single property
import {Address} from '@/modules/address'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getSquareMapArea} from '@/modules/waste-guide/utils/getSquareMapArea'

const wasteTypeMapping: {[key: string]: number[]} = {
  Rest: [12491],
  Glas: [12492],
  Papier: [12493],
  Plastic: [12494],
  Textiel: [12495, 13698],
  Brood: [12497],
  GFT: [12496],
}

const baseUrl = 'https://kaart.amsterdam.nl/afvalcontainers'

export const getContainerMapUrl = (
  coordinates: Address['coordinates'],
  afvalwijzerFractieCode?: WasteGuideResponseFraction['afvalwijzerFractieCode'],
) => {
  const locationTypes = `${(afvalwijzerFractieCode
    ? wasteTypeMapping[afvalwijzerFractieCode]
    : Object.values(wasteTypeMapping)
  ).join(',')}`
  const {lon, lat} = coordinates
  const urlParams = getSquareMapArea(lat, lon, 0.002)
  const url = urlParams
    ? `${baseUrl}#${urlParams.join('/')}/topo/${locationTypes}//`
    : baseUrl

  return url
}
