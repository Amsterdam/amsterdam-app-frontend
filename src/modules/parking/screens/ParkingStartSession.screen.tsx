import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/session/ParkingChooseEndTimeButton'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/session/ParkingChooseLicensePlateButton'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/session/ParkingChooseStartTimeButton'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/session/bottomsheet/ParkingSessionBottomSheet'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'

export const ParkingStartSessionScreen = () => (
  <ParkingSessionProvider>
    <Screen
      bottomSheet={<ParkingSessionBottomSheet />}
      testID="ParkingStartSessionScreen">
      <Box>
        <Column gutter="lg">
          <Column gutter="sm">
            <Title
              level="h2"
              testID="ParkingChooseLicensePlateTitle"
              text="Kenteken bezoeker"
            />
            <ParkingChooseLicensePlateButton />
            <Title
              level="h2"
              testID="ParkingChooseTimeTitle"
              text="Parkeertijd"
            />
            <ParkingChooseStartTimeButton />
            <ParkingChooseEndTimeButton />
            <Title
              level="h2"
              testID="ParkingCostTitle"
              text="Kosten"
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  </ParkingSessionProvider>
)
