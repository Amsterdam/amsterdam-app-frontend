import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingChooseStartTimeButton} from '@/modules/parking/components/form/ParkingChooseStartTimeButton'
import {ParkingEditSessionButtons} from '@/modules/parking/components/form/ParkingEditSessionButtons'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingReceiptV1} from '@/modules/parking/components/form/ParkingReceiptV1'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingShowStartTime} from '@/modules/parking/components/session/ParkingShowStartTime'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingApiVersion} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = NavigationProps<ParkingRouteName.editSession>

export const ParkingEditSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}
  const apiVersion = useCurrentParkingApiVersion()

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider parkingSession={parkingSession}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          hasStickyAlert
          testID="ParkingStartSessionScreen">
          <Box>
            <Column gutter="lg">
              {dayjs(parkingSession.start_date_time).isAfter(dayjs()) ? (
                <ParkingChooseStartTimeButton />
              ) : (
                <ParkingShowStartTime />
              )}

              <Column gutter="xl">
                <ParkingChooseEndTimeButton />
                {apiVersion === ParkingApiVersion.v1 ? (
                  <ParkingReceiptV1 />
                ) : (
                  <ParkingReceipt />
                )}
              </Column>

              <ParkingEditSessionButtons />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
