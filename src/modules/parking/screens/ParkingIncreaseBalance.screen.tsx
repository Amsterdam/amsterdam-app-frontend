import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingIncreaseBalanceButton} from '@/modules/parking/components/ParkingIncreaseBalanceButton'
import {ParkingChooseAmountButton} from '@/modules/parking/components/session/ParkingChooseAmountButton'
import {ParkingIncreaseBalanceReceipt} from '@/modules/parking/components/session/ParkingIncreaseBalanceReceipt'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/session/bottomsheet/ParkingSessionBottomSheet'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'

export const ParkingIncreaseBalanceScreen = () => (
  <ParkingSessionProvider>
    <Screen
      bottomSheet={<ParkingSessionBottomSheet />}
      testID="ParkingStartSessionScreen">
      <Box>
        <Column gutter="md">
          <Title
            level="h2"
            testID="ParkingChooseLicensePlateTitle"
            text="Bedrag"
          />
          <ParkingChooseAmountButton />
          <Gutter height="sm" />
          <Title
            level="h2"
            testID="ParkingChooseTimeTitle"
            text="Geldsaldo"
          />
          <ParkingIncreaseBalanceReceipt />
          <Gutter height="sm" />
          <ParkingIncreaseBalanceButton />
        </Column>
      </Box>
    </Screen>
  </ParkingSessionProvider>
)
