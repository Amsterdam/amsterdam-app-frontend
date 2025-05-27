import {useState} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingDashboardPermitSessionsChooseVisitorLicenseplate} from '@/modules/parking/components/dashboard/ParkingDashboardPermitSessionsChooseVisitorLicenseplate'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {ParkingSessionFormProvider} from '@/modules/parking/components/session/ParkingSessionFormProvider'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitSessions = () => {
  const [visitorVehicleId, setVisitorVehicleId] = useState<string>()
  const currentPermit = useCurrentParkingPermit()
  const {currentAccountType} = useCurrentParkingAccount()

  return (
    <ParkingSessionFormProvider>
      <Box variant="distinct">
        <Column gutter="lg">
          <Title
            level="h2"
            testID="ParkingPermitSessionsTitle"
            text="Parkeersessies"
          />
          {currentAccountType === ParkingPermitScope.visitor && (
            <ParkingDashboardPermitSessionsChooseVisitorLicenseplate
              onSetVehicleId={setVisitorVehicleId}
              vehicleId={visitorVehicleId}
            />
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
