import type {ParkingPermit} from '@/modules/parking/types'

const KNOWN_PERMIT_NAME_KEYWORDS: RegExp[] = [
  /ga-parkeervergunning.*\(passagiers\)/i,
  /mantelzorg/i,
  /bezoekersparkeervergunning/i,
  /kraskaartparkeervergunning/i,
  /bedrijfsvergunning/i,
  /met wisselend kenteken/i,
  /sportverenigingvergunning/i,
]

export const filterPermits = (permits: ParkingPermit[]) =>
  permits.filter(({permit_name}) =>
    KNOWN_PERMIT_NAME_KEYWORDS.some(keyword => keyword.test(permit_name)),
  )
