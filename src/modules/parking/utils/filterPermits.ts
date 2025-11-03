import type {ParkingPermit} from '@/modules/parking/types'

const KNOWN_PERMIT_NAME_KEYWORDS = [
  'GA-parkeervergunning',
  'mantelzorg',
  'Bezoekersparkeervergunning',
  'Kraskaartparkeervergunning',
  'Bedrijfsvergunning',
  'met wisselend kenteken',
  'Sportverenigingvergunning',
]

export const filterPermits = (permits: ParkingPermit[]) =>
  permits.filter(({permit_name}) => {
    const lowerCasePermitName = permit_name.toLowerCase()

    return KNOWN_PERMIT_NAME_KEYWORDS.some(keyword =>
      lowerCasePermitName.includes(keyword.toLowerCase()),
    )
  })
