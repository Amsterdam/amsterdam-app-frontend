import {useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionShowVisitorSessionsForm} from '@/modules/parking/components/session/ParkingSessionShowVisitorSessionsForm'

type Props = {
  onSetVehicleId: (vehicleId?: string) => void
  vehicleId?: string
}

export const ParkingDashboardPermitSessionsChooseVisitorLicenseplate = ({
  onSetVehicleId,
  vehicleId,
}: Props) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  return !vehicleId ? (
    <ParkingSessionShowVisitorSessionsForm
      isFormVisible={isFormVisible}
      onVehicleIdEntered={onSetVehicleId}
    />
  ) : (
    <Row gutter="no">
      <Phrase>{`Kenteken ${vehicleId}`}</Phrase>
      <Button
        label="wijzigen"
        onPress={() => {
          onSetVehicleId()
          setIsFormVisible(true)
        }}
        testID="ParkingSessionShowVisitorSessionsFormChangeButton"
        variant="tertiary"
      />
    </Row>
  )
}
