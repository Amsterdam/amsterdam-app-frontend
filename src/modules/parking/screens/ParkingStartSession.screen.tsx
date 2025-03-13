import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseLicensePlateTopTaskButton} from '@/modules/parking/components/session/ParkingChooseLicensePlateTopTaskButton'
import {ParkingSessionLicensePlateBottomSheet} from '@/modules/parking/components/session/ParkingSessionLicensePlateBottomSheet'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'

export const ParkingStartSessionScreen = () => (
  <ParkingSessionProvider>
    <Screen
      bottomSheet={
        <BottomSheet
          flex={1}
          snapPoints={['100%']}
          testID="ParkingSelectPermitBottomSheet">
          <ParkingSessionLicensePlateBottomSheet />
        </BottomSheet>
      }
      testID="ParkingStartSessionScreen">
      <Box>
        <Column gutter="lg">
          <Column gutter="sm">
            <Title
              level="h2"
              testID="ParkingChooseLicensePlateButton"
              text="Bezoeker kenteken"
            />
            <ParkingChooseLicensePlateTopTaskButton />
          </Column>
        </Column>
      </Box>
    </Screen>
  </ParkingSessionProvider>
)
