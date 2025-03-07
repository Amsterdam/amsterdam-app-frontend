import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingLoginForm} from '@/modules/parking/components/login/ParkingLoginForm'
import {ParkingLoginFormProvider} from '@/modules/parking/components/login/ParkingLoginFormProvider'
import {ParkingLoginFormSubmitButton} from '@/modules/parking/components/login/ParkingLoginFormSubmitButton'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.login>

export const ParkingLoginScreen = ({navigation: {navigate}}: Props) => (
  <ParkingLoginFormProvider>
    <Screen
      stickyFooter={<ParkingLoginFormSubmitButton />}
      testID="ParkingLoginScreen">
      <Box>
        <Column gutter="lg">
          <Title
            level="h2"
            text="Inloggen Aanmelden parkeren"
          />
          <ParkingLoginForm />
          <Button
            label="Pincode vergeten"
            onPress={() => navigate(ParkingRouteName.requestPinCode)}
            testID="ParkingLoginForgotPinButton"
            variant="tertiary"
          />
        </Column>
      </Box>
    </Screen>
  </ParkingLoginFormProvider>
)
