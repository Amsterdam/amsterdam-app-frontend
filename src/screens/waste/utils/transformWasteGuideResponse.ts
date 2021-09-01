import {Address} from '../../../types/address'
import {formatDateTimes, formatSentence} from '../../../utils'
import {mapWasteType, WasteGuide, WasteGuideResponse} from '../types'
import {appointmentUrl} from './appointmentUrl'

export const transformWasteGuideResponse = (
  wasteGuideResponse: WasteGuideResponse | undefined,
  address: Address | undefined,
): WasteGuide | undefined =>
  wasteGuideResponse?.features?.reduce<WasteGuide>((acc, feature) => {
    const {
      aanbiedwijze,
      frequentie,
      ophaaldag,
      opmerking,
      tijd_tot,
      tijd_vanaf,
      type,
    } = feature.properties

    let collectionDays = ophaaldag
    if (frequentie) {
      collectionDays += `, ${frequentie}*`
    }

    acc[mapWasteType(type)] = {
      collectionDays: collectionDays ?? undefined,
      howToOffer: aanbiedwijze ? formatSentence(aanbiedwijze) : '',
      remark: opmerking ? formatSentence(opmerking) : '',
      appointmentUrl: opmerking
        ? appointmentUrl(address, opmerking)
        : undefined,
      whenToPutOut:
        ophaaldag === 'Op afspraak'
          ? ''
          : ophaaldag
          ? formatSentence(
              formatDateTimes(
                ophaaldag,
                tijd_vanaf,
                tijd_tot,
                'aanbiedtijden onbekend',
                'ophaaldagen onbekend',
              ),
            )
          : '',
    }

    return acc
  }, {})
