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
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {LoginItem} from '@/modules/city-pass/components/LoginItem'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {useRegisterCityPassOwner} from '@/modules/city-pass/hooks/useRegisterCityPassOwner'
import {useShouldShowLoginScreen} from '@/modules/city-pass/hooks/useShouldShowLoginScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {UserRouteName} from '@/modules/user/routes'

type Props = NavigationProps<CityPassRouteName.loginSteps>

export const LoginStepsScreen = ({navigation, route}: Props) => {
  const {
    loginResult,
    accessToken: deeplinkAccessToken,
    refreshToken: deeplinkRefreshToken,
  } = route.params || {}
  const {navigate} = useNavigation()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode} = useGetSecureAccessCode()
  const isStepsComplete = isCityPassOwnerRegistered && accessCode
  const {setIsLoginStepsActive} = useLoginSteps()
  const {setShouldShowLoginScreen} = useShouldShowLoginScreen()
  const login = useLogin()
  const isUserRoute = navigation
    .getParent()
    ?.getState()
    .routes.find(r => r.name === 'user')

  useEffect(() => {
    setIsLoginStepsActive(true)
  }, [setIsLoginStepsActive])

  useRegisterCityPassOwner({
    loginResult,
    deeplinkAccessToken,
    deeplinkRefreshToken,
  })

  const onPress = useCallback(() => {
    if (!isCityPassOwnerRegistered) {
      login()

      return
    }

    if (!accessCode) {
      navigate(AccessCodeRouteName.setAccessCode)

      return
    }

    if (isStepsComplete) {
      setIsLoginStepsActive(false)
      setShouldShowLoginScreen(true)
      isUserRoute && navigate(UserRouteName.user)
    }
  }, [
    accessCode,
    isCityPassOwnerRegistered,
    isStepsComplete,
    isUserRoute,
    login,
    navigate,
    setIsLoginStepsActive,
    setShouldShowLoginScreen,
  ])

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            label={isStepsComplete ? 'Gereed' : 'Volgende'}
            onPress={onPress}
            testID="CityPassLoginScreenNextButton"
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
              isDone={isCityPassOwnerRegistered}
              numberIndicator={1}
              text="Om te laten zien wie u bent."
              title="Inloggen met DigiD"
            />
            <LoginItem
              isCurrent={isCityPassOwnerRegistered}
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
