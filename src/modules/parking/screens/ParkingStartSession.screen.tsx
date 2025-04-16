import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/form/ParkingChooseLicensePlateButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/form/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'

export const ParkingStartSessionScreen = () => (
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
          <Title
            level="h2"
            testID="ParkingChooseTimeTitle"
            text="Parkeertijd"
          />
          <ParkingChooseStartTimeButton />
          <ParkingChooseEndTimeButton />
          <ParkingChoosePaymentZone />
          <Gutter height="md" />
          <ParkingReceipt />
          <ParkingStartSessionButton />
        </Column>
      </Box>
    </Screen>
  </ParkingSessionFormProvider>
)
