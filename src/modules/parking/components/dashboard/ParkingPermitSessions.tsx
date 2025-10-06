import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingDashboardPermitSessionsChooseVisitorLicensePlate} from '@/modules/parking/components/dashboard/ParkingDashboardPermitSessionsChooseVisitorLicensePlate'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitSessions = () => {
  const {visitorVehicleId} = useVisitorVehicleId()
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  return (
    <Box variant="distinct">
      <Column gutter="lg">
        <Title
          level="h2"
          testID="ParkingPermitSessionsTitle"
          text="Parkeersessies"
        />
        {parkingAccount?.scope === ParkingPermitScope.visitor && (
          <ParkingDashboardPermitSessionsChooseVisitorLicensePlate />
        )}
        {(parkingAccount?.scope === ParkingPermitScope.permitHolder ||
          !!visitorVehicleId) && (
          <>
            <ParkingActiveSessionsSummary />
            {!currentPermit.no_endtime && <ParkingPlannedSessionsSummary />}
          </>
        )}
      </Column>
    </Box>
  )
}
