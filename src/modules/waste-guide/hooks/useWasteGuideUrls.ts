import {useMemo} from 'react'
import {useAddress} from '@/modules/address/hooks/useAddress'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {getBulkyWasteAppointmentUrl} from '@/modules/waste-guide/utils/getBulkyWasteAppointmentUrl'
import {getCollectionPointsMapUrl} from '@/modules/waste-guide/utils/getCollectionPointsMapUrl'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'
import {useEnvironment} from '@/store/slices/environment'

/**
 * This takes care of the post processing of the `afvalwijzerUrl` property. We check if the URL matches a known URL (bulkyWasteAppointmentUrl, wasteCollectionPointsUrl or wasteContainersUrl from the environment definitions) and if so, return the respective post processesed URL.
 */
export const useWasteGuideUrls = (fraction: WasteGuideResponseFraction) => {
  const {
    bulkyWasteAppointmentUrl,
    seenonsScheduleWastePickupUrl,
    wasteCollectionPointsUrl,
    wasteContainersUrl,
  } = useEnvironment()
  const address = useAddress()

  const {afvalwijzerFractieCode, afvalwijzerInstructie2, afvalwijzerUrl} =
    fraction

  // TODO: remove url post processing once the API includes the url as a single property
  return useMemo(
    () => ({
      bulkyWasteAppointmentUrl:
        afvalwijzerUrl === bulkyWasteAppointmentUrl
          ? getBulkyWasteAppointmentUrl(bulkyWasteAppointmentUrl, address)
          : undefined,
      collectionPointsMapUrl:
        afvalwijzerInstructie2.includes('een Afvalpunt') &&
        afvalwijzerUrl === wasteCollectionPointsUrl
          ? getCollectionPointsMapUrl(
              wasteCollectionPointsUrl,
              address?.coordinates,
            )
          : undefined,
      containerMapUrl:
        afvalwijzerUrl === wasteContainersUrl
          ? getContainerMapUrl(
              wasteContainersUrl,
              address?.coordinates,
              afvalwijzerFractieCode,
            )
          : undefined,
      seenonsUrl:
        afvalwijzerUrl.indexOf(seenonsScheduleWastePickupUrl) === 0
          ? afvalwijzerUrl
          : undefined,
    }),
    [
      address,
      afvalwijzerFractieCode,
      afvalwijzerInstructie2,
      afvalwijzerUrl,
      bulkyWasteAppointmentUrl,
      seenonsScheduleWastePickupUrl,
      wasteCollectionPointsUrl,
      wasteContainersUrl,
    ],
  )
}
