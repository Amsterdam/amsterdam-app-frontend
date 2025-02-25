import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingLoginForm} from '@/modules/parking/components/ParkingLoginForm'
import {ParkingLoginFormProvider} from '@/modules/parking/components/ParkingLoginFormProvider'
import {ParkingLoginFormSubmitButton} from '@/modules/parking/components/ParkingLoginFormSubmitButton'

export const ParkingLoginScreen = () => (
  <ParkingLoginFormProvider>
    <Screen
      stickyFooter={<ParkingLoginFormSubmitButton />}
      testID="ParkingLoginScreen">
      <Box>
        <Column gutter="lg">
          <Title
            level="h2"
            text="Inloggen Aanmelden Parkeren"
          />
          <ParkingLoginForm />
        </Column>
      </Box>
    </Screen>
  </ParkingLoginFormProvider>
)
