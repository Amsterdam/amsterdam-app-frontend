// Remove once the waste guide API includes this as a single property
import {Address} from '@/modules/address'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'

const wasteTypeMapping: {[key: string]: number[]} = {
  Rest: [12491],
  Glas: [12492],
  Papier: [12493],
  Plastic: [12494],
  Textiel: [12495, 13698],
  Brood: [12497],
  GFT: [12496],
}

export const getContainerMapUrl = (
  centroid: Address['centroid'],
  afvalwijzerFractieCode?: WasteGuideResponseFraction['afvalwijzerFractieCode'],
  offsetLocation?: boolean,
) => {
  const location = `${centroid[0].toFixed(5)}/${(
    centroid[1] - (offsetLocation ? 0.0035 : 0)
  ).toFixed(5)}`
  const center = `${centroid[0].toFixed(5)},${centroid[1].toFixed(5)}`

  const showTypes = `${(afvalwijzerFractieCode
    ? wasteTypeMapping[afvalwijzerFractieCode]
    : Object.values(wasteTypeMapping)
  ).join(',')}`

  return `https://kaart.amsterdam.nl/afvalcontainers/#17/${location}/brt/${showTypes}///${center}`
}
