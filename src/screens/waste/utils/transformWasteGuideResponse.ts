import {Address} from '../../../types/address'
import {formatDateTimes, formatSentence} from '../../../utils'
import {mapWasteType, WasteGuide, WasteGuideResponse} from '../types'
import {appointmentUrl} from './appointmentUrl'

export const transformWasteGuideResponse = (
  wasteGuideResponse: WasteGuideResponse | undefined,
  address: Address | undefined,
): WasteGuide | undefined =>
  wasteGuideResponse?.features?.reduce<WasteGuide>((acc, feature) => {
    const {type, ophaaldag, aanbiedwijze, opmerking, tijd_tot, tijd_vanaf} =
      feature.properties

    acc[mapWasteType(type)] = {
      collectionDays: ophaaldag ? formatSentence(ophaaldag) : '',
      howToOffer: aanbiedwijze ? formatSentence(aanbiedwijze) : '',
      remark: opmerking ? formatSentence(opmerking) : '',
      appointmentUrl: opmerking && appointmentUrl(address, opmerking),
      whenToPutOut: ophaaldag
        ? formatSentence(
            formatDateTimes(
              ophaaldag,
              tijd_vanaf,
              'aanbiedtijden onbekend',
              'ophaaldagen onbekend',
              tijd_tot,
            ),
          )
        : '',
    }

    return acc
  }, {})
