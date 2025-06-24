import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {ParkingLoginForm} from '@/modules/parking/components/login/ParkingLoginForm'
import {useShouldShowLoginScreen} from '@/modules/parking/hooks/useShouldShowLoginScreen'

export const ParkingLoginScreen = () => {
  const {shouldShowLoginScreen, setShouldShowLoginScreen} =
    useShouldShowLoginScreen()

  useBlurEffect(() => {
    shouldShowLoginScreen && setShouldShowLoginScreen(false)
  })

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ParkingLoginScreen">
      <Box>
        <ParkingLoginForm />
      </Box>
    </Screen>
  )
}
