import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/form/ParkingChooseLicensePlateButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionChooseTime} from '@/modules/parking/components/form/ParkingSessionChooseTime'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingStartSessionVisitorPermitZone} from '@/modules/parking/components/session/ParkingStartSessionVisitorPermitZone'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {
  useCurrentParkingAccount,
  useVisitorVehicleId,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingStartSessionScreen = () => {
  const {currentAccountType} = useCurrentParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          testID="ParkingStartSessionScreen">
          <Box>
            <Column gutter="lg">
              {currentAccountType === ParkingPermitScope.permitHolder ? (
                <Title
                  level="h2"
                  testID="ParkingChooseLicensePlateTitle"
                  text="Kenteken bezoeker"
                />
              ) : (
                <ParkingStartSessionVisitorPermitZone />
              )}
              {currentAccountType === ParkingPermitScope.permitHolder ? (
                <ParkingChooseLicensePlateButton />
              ) : (
                <Column gutter="sm">
                  <Title
                    level="h2"
                    testID="ParkingVisitorLicensePlateTitle"
                    text="Uw kenteken"
                  />
                  <ParkingVehicleIdTextInput
                    defaultValue={visitorVehicleId}
                    inputInstructions="Alleen letters en cijfers"
                    testID="ParkingVisitorLicensePlateInputField"
                  />
                </Column>
              )}
              <ParkingSessionChooseTime />
              <ParkingReceipt />
              <ParkingStartSessionButton />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
