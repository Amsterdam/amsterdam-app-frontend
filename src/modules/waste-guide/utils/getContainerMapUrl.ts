// Remove once the waste guide API includes this as a single property
import {Address} from '@/modules/address'
import {FractionCode, WasteGuideUrl} from '@/modules/waste-guide/types'
import {getSquareMapArea} from '@/modules/waste-guide/utils/getSquareMapArea'

const wasteTypeMapping: Record<
  Exclude<FractionCode, FractionCode.GA> | 'Brood',
  number[]
> = {
  Rest: [12491],
  Glas: [12492],
  Papier: [12493],
  Plastic: [12494],
  Textiel: [12495, 13698],
  Brood: [12497],
  GFT: [12496],
}

// TODO: remove centroid once standardization of address data is done
export const getContainerMapUrl = (
  centroid: Address['centroid'],
  coordinates: Address['coordinates'],
  afvalwijzerFractieCode?: FractionCode,
) => {
  const getLocationTypes = () => {
    if (
      afvalwijzerFractieCode &&
      Object.keys(wasteTypeMapping).includes(afvalwijzerFractieCode) &&
      afvalwijzerFractieCode !== FractionCode.GA
    ) {
      return wasteTypeMapping[afvalwijzerFractieCode].join(',')
    }

    return Object.values(wasteTypeMapping).join(',')
  }
  const locationTypes = getLocationTypes()
  const {lon, lat} = coordinates ?? {
    lon: centroid?.[0] ?? 0,
    lat: centroid?.[1] ?? 0,
  }
  const urlParams = getSquareMapArea(lat, lon, 0.002)
  const url = urlParams
    ? `${WasteGuideUrl.wasteContainersUrl}#${urlParams.join(
        '/',
      )}/topo/${locationTypes}//`
    : WasteGuideUrl.wasteContainersUrl

  return url
}
