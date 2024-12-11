import {useCallback} from 'react'
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
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {LoginItem} from '@/modules/city-pass/components/LoginItem'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {useRegisterCityPassOwner} from '@/modules/city-pass/hooks/useRegisterCityPassOwner'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'

const ACCESS_CODE_SLUG = ModuleSlug['access-code']

type Props = NavigationProps<CityPassRouteName.loginSteps>

export const LoginStepsScreen = ({route}: Props) => {
  const {
    loginResult,
    accessToken: deeplinkAccessToken,
    refreshToken: deeplinkRefreshToken,
  } = route.params || {}
  const {navigate} = useNavigation()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode} = useGetSecureAccessCode()
  const isStepsComplete = isCityPassOwnerRegistered && accessCode
  const login = useLogin()
  const {attemptsLeft, isCodeValid} = useAccessCode()

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
      navigate(ACCESS_CODE_SLUG, {
        screen: AccessCodeRouteName.setAccessCode,
      })

      return
    }

    if (!isCodeValid && attemptsLeft <= 0) {
      navigate(ACCESS_CODE_SLUG, {
        screen: AccessCodeRouteName.setAccessCode,
      })

      return
    }

    if (isStepsComplete) {
      navigate(CityPassRouteName.dashboard)
    }
  }, [
    accessCode,
    attemptsLeft,
    isCityPassOwnerRegistered,
    isCodeValid,
    isStepsComplete,
    login,
    navigate,
  ])

  return (
    <Screen
      hasStickyAlert
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
