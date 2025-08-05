import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
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
      <Title
        level="h5"
        testID="ParkingPermitDetailPermitZoneTitlePhrase"
        text="Vergunninggebied"
      />
      <Column halign="start">
        <Phrase testID="ParkingPermitDetailPermitZoneNamePhrase">
          {permit.permit_zone.name}
        </Phrase>
      </Column>
    </Column>
  )
}
