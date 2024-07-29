import {useCallback} from 'react'
import {Alert} from 'react-native'
import DigiD from '@/assets/icons/digid.svg'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDispatch} from '@/hooks/redux/useDispatch'
import CityPassImage from '@/modules/city-pass/assets/city-pass.svg'
import {useAccessTokens} from '@/modules/city-pass/hooks/useAccessTokens'
import {saveCityPass} from '@/modules/city-pass/slice'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

export const LoginScreen = () => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const openWebUrl = useOpenWebUrl()

  const {accessToken} = useAccessTokens() ?? {}

  const login = useCallback(() => {
    dispatch(saveCityPass('test'))

    setAlert({
      variant: AlertVariant.positive,
      text: 'Je Stadspas staat nu ook in de app.',
      title: 'Gelukt!',
      hasIcon: true,
      hasCloseIcon: true,
      testID: 'CityPassLoggedInAlert',
    })
  }, [dispatch, setAlert])

  const loginMijnAmsterdam = useCallback(() => {
    if (accessToken) {
      openWebUrl(
        `https://az-acc.mijn.amsterdam.nl/api/v1/services/amsapp/stadspas/login/${accessToken}`,
      )
    }
  }, [accessToken, openWebUrl])

  const {data: redirectUrls} = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  const requestCityPass = useCallback(() => {
    if (redirectUrls?.[RedirectKey.cityPassRequest]) {
      openWebUrl(redirectUrls[RedirectKey.cityPassRequest])
    } else {
      Alert.alert('Sorry, deze functie is niet beschikbaar.')
      trackException(ExceptionLogKey.redirectNotFound, 'Redirects.tsx', {
        urlKey: RedirectKey.cityPassRequest,
      })
    }
  }, [openWebUrl, redirectUrls, trackException])

  return (
    <Screen
      hasStickyAlert
      testID="CityPassDashboardScreen">
      <FigureWithFacadesBackground testID="CityPassStartImage">
        <CityPassImage />
      </FigureWithFacadesBackground>
      <Box>
        <Title text="Zet uw Stadspas in de app" />
        <Gutter height="sm" />
        <Paragraph>
          Log eenmalig in met DigiD en zet uw Stadpas in de app. Daarna kunt u
          de Stadspas gebruiken en laten scannen.
        </Paragraph>
        <Gutter height="lg" />
        <Row gutter="sm">
          <HideFromAccessibility>
            <Pressable
              onPress={login}
              testID="CityPassDigiDIconPressable">
              <DigiD />
            </Pressable>
          </HideFromAccessibility>
          <Column
            grow={1}
            gutter="md"
            halign="stretch">
            <Button
              label="Inloggen met DigiD"
              onPress={login}
              testID="CityPassLoginButton"
            />
            <Button
              label="Open Mijn Amsterdam"
              onPress={loginMijnAmsterdam}
              testID="CityPassLoginMijnAmsterdamButton"
            />
          </Column>
        </Row>
        <Gutter height="xl" />
        <Title text="Stadspas" />
        <Gutter height="sm" />
        <Paragraph>
          De Stadspas is voor Amsterdammers met een laag inkomen en weinig
          vermogen. Met de Stadspas kunt u gratis of met korting leuke
          activiteiten doen.
        </Paragraph>
        <Gutter height="lg" />
        <Button
          accessibilityRole="link"
          label="Stadspas aanvragen"
          onPress={requestCityPass}
          testID="CityPassLoginButton"
          variant="secondary"
        />
      </Box>
    </Screen>
  )
}
