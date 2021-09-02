import {Address} from '../../../types/address'
import {formatDatesTimes, formatSentence} from '../../../utils'
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
      collectionDays += `, ${frequentie}`
    }

    acc[mapWasteType(type)] = {
      appointmentUrl: opmerking
        ? appointmentUrl(address, opmerking)
        : undefined,
      collectionDays: collectionDays
        ? formatSentence(collectionDays)
        : undefined,
      howToOffer: aanbiedwijze ? formatSentence(aanbiedwijze) : undefined,
      remark: opmerking ? formatSentence(opmerking) : undefined,
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
                'ophaaldagen onbekend',
              ),
            )
          : '',
    }

    return acc
  }, {})
