import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ParkingStartSessionVisitorPermitZone = () => {
  const {permit_zone} = useCurrentParkingPermit()

  return (
    <Column gutter="sm">
      <Title
        level="h2"
        testID="ParkingStartSessionVisitorPermitZoneTitle"
        text="Hier kunt u parkeren"
      />
      <Paragraph testID="ParkingStartSessionVisitorPermitZoneParagraph">
        {`Vergunningsgebied ${permit_zone.name}`}
      </Paragraph>
    </Column>
  )
}
