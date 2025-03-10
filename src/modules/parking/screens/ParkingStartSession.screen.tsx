import {Screen} from '@/components/features/screen/Screen'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingSelectLicensePlate} from '@/modules/parking/components/ParkingSelectLicensePlate'
import {ParkingChooseLicensePlateTopTaskButton} from '@/modules/parking/components/buttons/ParkingChooseLicensePlateTopTaskButton'

export const ParkingStartSessionScreen = () => (
  <Screen
    bottomSheet={
      <BottomSheet testID="ParkingSelectPermitBottomSheet">
        <ParkingSelectLicensePlate />
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
)
