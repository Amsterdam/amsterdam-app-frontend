import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/form/ParkingChooseLicensePlateButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionChooseTime} from '@/modules/parking/components/form/ParkingSessionChooseTime'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'

export const ParkingStartSessionScreen = () => (
  <CurrentPermitProvider>
    <ParkingSessionFormProvider>
      <Screen
        bottomSheet={<ParkingSessionBottomSheet />}
        testID="ParkingStartSessionScreen">
        <Box>
          <Column gutter="sm">
            <Title
              level="h2"
              testID="ParkingChooseLicensePlateTitle"
              text="Kenteken bezoeker"
            />
            <ParkingChooseLicensePlateButton />
            <Gutter height="md" />
            <ParkingSessionChooseTime />
            <ParkingReceipt />
            <ParkingStartSessionButton />
          </Column>
        </Box>
      </Screen>
    </ParkingSessionFormProvider>
  </CurrentPermitProvider>
)
