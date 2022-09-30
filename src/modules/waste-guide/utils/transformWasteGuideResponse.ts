import {EnvironmentConfig} from '@/environment'
import {Address} from '@/modules/address'
import {
  mapWasteType,
  WasteGuide,
  WasteGuideResponse,
} from '@/modules/waste-guide/types'
import {appointmentUrl} from '@/modules/waste-guide/utils'
import {formatDatesTimes, formatSentence} from '@/utils'

export const transformWasteGuideResponse = (
  wasteGuideResponse: WasteGuideResponse,
  address: Address | undefined,
  environment: EnvironmentConfig,
): WasteGuide | undefined =>
  wasteGuideResponse.features?.reduce<WasteGuide>((acc, feature) => {
    const {
      aanbiedwijze,
      frequentie,
      ophaaldag,
      opmerking,
      tijd_tot,
      tijd_vanaf,
      type,
    } = feature.properties

    const wasteLabel: Record<string, string> = {
      grofvuil: 'Grof afval',
      huisvuil: 'Restafval',
    }

    let collectionDays = ophaaldag
    if (frequentie) {
      collectionDays += `, ${frequentie}`
    }

    acc[mapWasteType(type)] = {
      appointmentUrl: opmerking
        ? appointmentUrl(opmerking, address, environment)
        : undefined,
      collectionDays: collectionDays
        ? formatSentence(collectionDays)
        : undefined,
      howToOffer: aanbiedwijze ? formatSentence(aanbiedwijze) : undefined,
      remark: opmerking ? formatSentence(opmerking) : undefined,
      title: wasteLabel[type],
      whenToPutOut:
        ophaaldag === 'Op afspraak'
          ? ''
          : ophaaldag
          ? formatSentence(
              formatDatesTimes(
                ophaaldag,
                tijd_vanaf,
                tijd_tot,
                'aanbiedtijden onbekend',
                'op de afgesproken dag',
              ),
            )
          : '',
    }

    return acc
  }, {})
