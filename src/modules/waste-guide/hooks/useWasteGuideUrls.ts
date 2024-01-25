import {useMemo} from 'react'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {WASTE_GUIDE_EXTERNAL_LINKS} from '@/modules/waste-guide/constants'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getBulkyWasteAppointmentUrl} from '@/modules/waste-guide/utils/getBulkyWasteAppointmentUrl'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'

/**
 * This takes care of the post processing of the `afvalwijzerUrl` property. We check if the URL matches a known URL (BULKY_WASTE_APPOINTMENT_URLUrl, WASTE_COLLECTION_POINTS_URL or WASTE_CONTAINERS_URL from the environment definitions) and if so, return the respective post processesed URL.
 */
export const useWasteGuideUrls = (fraction: WasteGuideResponseFraction) => {
  const {
    BULKY_WASTE_APPOINTMENT_URL,
    SCHEDULE_WASTE_PICKUP_URL,
    WASTE_COLLECTION_POINTS_URL,
    WASTE_CONTAINERS_URL,
  } = WASTE_GUIDE_EXTERNAL_LINKS
  const address = useAddress()

  const {afvalwijzerFractieCode, afvalwijzerInstructie2, afvalwijzerUrl} =
    fraction

  // TODO: remove url post processing once the API includes the url as a single property
  return useMemo(
    () => ({
      bulkyWasteAppointmentUrl:
        afvalwijzerUrl === BULKY_WASTE_APPOINTMENT_URL
          ? getBulkyWasteAppointmentUrl(BULKY_WASTE_APPOINTMENT_URL, address)
          : undefined,
      collectionPointsMapUrl:
        afvalwijzerInstructie2.includes('een Afvalpunt') &&
        afvalwijzerUrl === WASTE_COLLECTION_POINTS_URL
          ? getCollectionPointsMapUrl(
              WASTE_COLLECTION_POINTS_URL,
              address?.coordinates,
            )
          : undefined,
      containerMapUrl:
        afvalwijzerUrl === WASTE_CONTAINERS_URL
          ? getContainerMapUrl(
              WASTE_CONTAINERS_URL,
              address?.coordinates,
              afvalwijzerFractieCode,
            )
          : undefined,
      seenonsUrl:
        afvalwijzerUrl?.indexOf(SCHEDULE_WASTE_PICKUP_URL) === 0
          ? afvalwijzerUrl
          : undefined,
    }),
    [
      address,
      afvalwijzerFractieCode,
      afvalwijzerInstructie2,
      afvalwijzerUrl,
      BULKY_WASTE_APPOINTMENT_URL,
      SCHEDULE_WASTE_PICKUP_URL,
      WASTE_COLLECTION_POINTS_URL,
      WASTE_CONTAINERS_URL,
    ],
  )
}
