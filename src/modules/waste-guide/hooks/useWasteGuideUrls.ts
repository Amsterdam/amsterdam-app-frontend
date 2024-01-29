import {useMemo} from 'react'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {
  BULKY_WASTE_APPOINTMENT,
  SCHEDULE_WASTE_PICKUP,
  WASTE_COLLECTION_POINTS,
  WASTE_CONTAINERS,
} from '@/modules/waste-guide/external-links'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getBulkyWasteAppointmentUrl} from '@/modules/waste-guide/utils/getBulkyWasteAppointmentUrl'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'

/**
 * This takes care of the post processing of the `afvalwijzerUrl` property. We check if the URL matches a known URL (BULKY_WASTE_APPOINTMENTUrl, WASTE_COLLECTION_POINTS or WASTE_CONTAINERS from the environment definitions) and if so, return the respective post processesed URL.
 */
export const useWasteGuideUrls = (fraction: WasteGuideResponseFraction) => {
  const {afvalwijzerFractieCode, afvalwijzerInstructie2, afvalwijzerUrl} =
    fraction
  const address = useAddress()

  // TODO: remove url post processing once the API includes the url as a single property
  return useMemo(
    () => ({
      bulkyWasteAppointmentUrl:
        afvalwijzerUrl === BULKY_WASTE_APPOINTMENT
          ? getBulkyWasteAppointmentUrl(BULKY_WASTE_APPOINTMENT, address)
          : undefined,
      collectionPointsMapUrl:
        afvalwijzerInstructie2.includes('een Afvalpunt') &&
        afvalwijzerUrl === WASTE_COLLECTION_POINTS
          ? getCollectionPointsMapUrl(
              WASTE_COLLECTION_POINTS,
              address?.coordinates,
            )
          : undefined,
      containerMapUrl:
        afvalwijzerUrl === WASTE_CONTAINERS
          ? getContainerMapUrl(
              WASTE_CONTAINERS,
              address?.coordinates,
              afvalwijzerFractieCode,
            )
          : undefined,
      seenonsUrl:
        afvalwijzerUrl?.indexOf(SCHEDULE_WASTE_PICKUP) === 0
          ? afvalwijzerUrl
          : undefined,
    }),
    [address, afvalwijzerFractieCode, afvalwijzerInstructie2, afvalwijzerUrl],
  )
}
