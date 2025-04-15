import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingEditSessionButtons} from '@/modules/parking/components/ParkingEditSessionButtons'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/session/ParkingChooseEndTimeButton'
import {ParkingReceipt} from '@/modules/parking/components/session/ParkingReceipt'
import {ParkingShowStartTime} from '@/modules/parking/components/session/ParkingShowStartTime'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/session/bottomsheet/ParkingSessionBottomSheet'
import {ParkingSessionProvider} from '@/modules/parking/providers/ParkingSessionProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.editSession>

export const ParkingEditSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <ParkingSessionProvider parkingSession={parkingSession}>
      <Screen
        bottomSheet={<ParkingSessionBottomSheet />}
        testID="ParkingStartSessionScreen">
        <Box>
          <Column gutter="sm">
            <Title
              level="h2"
              testID="ParkingChooseTimeTitle"
              text="Parkeertijd"
            />
            <ParkingShowStartTime />
            <ParkingChooseEndTimeButton />
            <Gutter height="md" />
            <ParkingReceipt />
            <ParkingEditSessionButtons />
          </Column>
        </Box>
      </Screen>
    </ParkingSessionProvider>
  )
}
