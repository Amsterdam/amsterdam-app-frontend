import {useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionShowVisitorSessionsForm} from '@/modules/parking/components/session/ParkingSessionShowVisitorSessionsForm'
import {useVisitorVehicleId} from '@/modules/parking/slice'

export const ParkingDashboardPermitSessionsChooseVisitorLicenseplate = () => {
  const {visitorVehicleId, setVisitorVehicleId} = useVisitorVehicleId()
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  return visitorVehicleId ? (
    <Row gutter="no">
      <Phrase>{`Kenteken ${visitorVehicleId}`}</Phrase>
      <Button
        label="wijzigen"
        onPress={() => {
          setVisitorVehicleId(undefined)
          setIsFormVisible(true)
        }}
        testID="ParkingSessionShowVisitorSessionsFormChangeButton"
        underline
        variant="tertiary"
      />
    </Row>
  ) : (
    <ParkingSessionShowVisitorSessionsForm isFormVisible={isFormVisible} />
  )
}
