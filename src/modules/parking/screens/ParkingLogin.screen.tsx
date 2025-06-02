import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingLoginForm} from '@/modules/parking/components/login/ParkingLoginForm'

export const ParkingLoginScreen = () => (
  <Screen
    hasStickyAlert
    keyboardAware
    testID="ParkingLoginScreen">
    <Box>
      <Column gutter="lg">
        <Title
          level="h2"
          text="Inloggen Aanmelden parkeren"
        />
        <ParkingLoginForm />
      </Column>
    </Box>
  </Screen>
)
