import {useCallback, useEffect} from 'react'
import {View} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {LoginItem} from '@/modules/city-pass/components/LoginItem'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {useShouldShowIntroScreen} from '@/modules/parking/hooks/useShouldShowIntroScreen'
import {ParkingRouteName} from '@/modules/parking/routes'
import {UserRouteName} from '@/modules/user/routes'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = NavigationProps<ParkingRouteName.loginSteps>

export const LoginStepsScreen = ({navigation}: Props) => {
  const {navigate} = useNavigation()
  const {item: securePermitHolder, isLoading: isLoadingSecurePermitHolder} =
    useGetSecureItem(SecureItemKey.parkingPermitHolder)
  const {item: secureVisitor, isLoading: isLoadingSecureVisitor} =
    useGetSecureItem(SecureItemKey.parkingVisitor)
  const isLoggedIn = securePermitHolder || secureVisitor
  const {accessCode} = useGetSecureAccessCode()
  const isStepsComplete = isLoggedIn && accessCode
  const {setIsLoginStepsActive} = useLoginSteps()
  const {setShouldShowIntroScreen} = useShouldShowIntroScreen()
  const isUserRoute = navigation
    .getParent()
    ?.getState()
    .routes.find(r => r.name === 'user')

  useEffect(() => {
    setIsLoginStepsActive(true)
  }, [setIsLoginStepsActive])

  const onPress = useCallback(() => {
    if (!accessCode) {
      navigate(AccessCodeRouteName.setAccessCode)

      return
    }

    if (isStepsComplete) {
      setIsLoginStepsActive(false)
      setShouldShowIntroScreen(true)
      isUserRoute && navigate(UserRouteName.user)
    }
  }, [
    accessCode,
    isStepsComplete,
    isUserRoute,
    navigate,
    setIsLoginStepsActive,
    setShouldShowIntroScreen,
  ])

  if (isLoadingSecureVisitor || isLoadingSecurePermitHolder) {
    return null
  }

  return (
    <Screen
      hasStickyAlert
      stickyFooter={
        <Box>
          <Button
            accessibilityLabel={
              isStepsComplete
                ? 'Gereed'
                : isLoggedIn
                  ? 'Volgende. Ga naar toegangscode instellen.'
                  : 'Volgende. Ga naar inloggen aanmelden parkeren.'
            }
            label={isStepsComplete ? 'Gereed' : 'Volgende'}
            onPress={onPress}
            testID="ParkingLoginScreenNextButton"
          />
        </Box>
      }
      testID="LoginStepsScreenButton">
      <Box>
        <Column gutter="lg">
          <Column gutter="sm">
            <Title
              testID="LoginStepsScreenTitle"
              text="Inloggen & beveiligen"
            />
            <Paragraph testID="LoginStepsScreenParagraph">
              Stel na het inloggen een toegangscode in.
            </Paragraph>
          </Column>
          <View>
            <LoginItem
              isCurrent
              isDone={!!isLoggedIn}
              isNextDone={!!accessCode}
              numberIndicator={1}
              text="Met uw meldcode en pincode."
              title="Inloggen Aanmelden Parkeren"
            />
            <LoginItem
              isCurrent={!!isLoggedIn}
              isDone={!!accessCode}
              isLast
              numberIndicator={2}
              text="Om uw persoonlijke gegevens te beschermen."
              title="Toegangscode instellen"
            />
          </View>
        </Column>
      </Box>
    </Screen>
  )
}
