import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingPermit} from '@/modules/parking/types'

type Props = {
  permit: ParkingPermit
}

export const ParkingPermitDetailPermitZone = ({permit}: Props) => {
  if (!permit) {
    return null
  }

  return (
    <Column gutter="xs">
      <Phrase
        emphasis="strong"
        testID="ParkingPermitDetailPermitZoneTitlePhrase">
        Vergunninggebied
      </Phrase>
      <Column>
        <Phrase testID="ParkingPermitDetailPermitZoneNamePhrase">
          {permit.permit_zone.name}
        </Phrase>
      </Column>
    </Column>
  )
}
