import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/form/ParkingChooseLicensePlateButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionChooseParkingMachine} from '@/modules/parking/components/form/ParkingSessionChooseParkingMachine'
import {ParkingSessionChooseTime} from '@/modules/parking/components/form/ParkingSessionChooseTime'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingStartSessionButton} from '@/modules/parking/components/form/ParkingStartSessionButton'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingMaxSessionsWarning} from '@/modules/parking/components/session/ParkingMaxSessionsWarning'
import {ParkingStartSessionVisitorPermitZone} from '@/modules/parking/components/session/ParkingStartSessionVisitorPermitZone'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {CurrentPermitProvider} from '@/modules/parking/provides/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingApiVersion, ParkingPermitScope} from '@/modules/parking/types'

type Props = NavigationProps<ParkingRouteName.startSession>

export const ParkingStartSessionScreen = ({route}: Props) => {
  const {params} = route || {}
  const parkingAccount = useParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()
  const apiVersion = useCurrentParkingApiVersion()

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider defaultStartTime={params?.defaultStartTime}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          testID="ParkingStartSessionScreen">
          <Box
            insetBottom="no"
            insetHorizontal="md"
            insetTop="md">
            <Column gutter="xl">
              <Column gutter="lg">
                {parkingAccount?.scope === ParkingPermitScope.permitHolder ? (
                  <Title
                    level="h2"
                    testID="ParkingChooseLicensePlateTitle"
                    text="Kenteken bezoeker"
                  />
                ) : (
                  <ParkingStartSessionVisitorPermitZone />
                )}
                {parkingAccount?.scope === ParkingPermitScope.permitHolder ? (
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
                {apiVersion === ParkingApiVersion.v2 && (
                  <ParkingSessionChooseParkingMachine />
                )}
                <ParkingSessionChooseTime />

                <ParkingMaxSessionsWarning />
              </Column>
              <ParkingReceipt />
              <ParkingStartSessionButton />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
