import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingVisitorEditSessionButtons} from '@/modules/parking/components/form/ParkingVisitorEditSessionButtons'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingShowStartTime} from '@/modules/parking/components/session/ParkingShowStartTime'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.editSession>

export const ParkingVisitorEditSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider
        extendVisitorSession
        parkingSession={parkingSession}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          hasStickyAlert
          testID="ParkingStartSessionScreen">
          <Box>
            <Column gutter="lg">
              <ParkingShowStartTime fieldName="originalStartTime" />
              <Column gutter="xl">
                <ParkingChooseEndTimeButton />
                <ParkingReceipt />
              </Column>
              <ParkingVisitorEditSessionButtons />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
