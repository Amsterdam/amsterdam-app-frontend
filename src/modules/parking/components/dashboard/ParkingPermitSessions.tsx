import {useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {ParkingSessionFormProvider} from '@/modules/parking/components/session/ParkingSessionFormProvider'
import {ParkingSessionShowVisitorSessionsForm} from '@/modules/parking/components/session/ParkingSessionShowVisitorSessionsForm'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitSessions = () => {
  const currentPermit = useCurrentParkingPermit()
  const {currentAccountType} = useCurrentParkingAccount()
  const [visitorVehicleId, setVisitorVehicleId] = useState<string>()
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false)

  return (
    <ParkingSessionFormProvider>
      <Box variant="distinct">
        <Column gutter="lg">
          <Title
            level="h2"
            testID="ParkingPermitSessionsTitle"
            text="Parkeersessies"
          />
          {currentAccountType === ParkingPermitScope.visitor &&
          !visitorVehicleId ? (
            <ParkingSessionShowVisitorSessionsForm
              isFormVisible={isFormVisible}
              onVehicleIdEntered={setVisitorVehicleId}
            />
          ) : (
            <Row gutter="no">
              <Phrase>{`Kenteken ${visitorVehicleId}`}</Phrase>
              <Button
                label="wijzigen"
                onPress={() => {
                  setVisitorVehicleId(undefined)
                  setIsFormVisible(true)
                }}
                testID="ParkingSessionShowVisitorSessionsFormChangeButton"
                variant="tertiary"
              />
            </Row>
          )}
          {(currentAccountType === ParkingPermitScope.permitHolder ||
            !!visitorVehicleId) && (
            <>
              <ParkingActiveSessionsSummary
                visitorVehicleId={visitorVehicleId}
              />
              {!currentPermit.no_endtime && (
                <ParkingPlannedSessionsSummary
                  visitorVehicleId={visitorVehicleId}
                />
              )}
            </>
          )}
        </Column>
      </Box>
    </ParkingSessionFormProvider>
  )
}
