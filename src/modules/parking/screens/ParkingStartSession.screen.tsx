import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/session/ParkingChooseEndTimeButton'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/session/ParkingChooseLicensePlateButton'
import {ParkingChoosePaymentZone} from '@/modules/parking/components/session/ParkingChoosePaymentZone'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/session/ParkingChooseStartTimeButton'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/session/bottomsheet/ParkingSessionBottomSheet'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'

export const ParkingStartSessionScreen = () => (
  <ParkingSessionProvider>
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
          <Title
            level="h2"
            testID="ParkingCostTitle"
            text="Kosten"
          />
        </Column>
      </Box>
    </Screen>
  </ParkingSessionProvider>
)
