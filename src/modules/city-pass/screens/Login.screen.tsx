import {useCallback} from 'react'
import {Alert} from 'react-native'
import DigiD from '@/assets/icons/digid.svg'
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
import {saveCityPass} from '@/modules/city-pass/slice'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

export const LoginScreen = () => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
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
  const openWebUrl = useOpenWebUrl()
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
          <Pressable
            onPress={login}
            testID="CityPassDigiDIconPressable">
            <DigiD />
          </Pressable>
          <Column
            grow={1}
            halign="stretch">
            <Button
              label="Inloggen met DigiD"
              onPress={login}
              testID="CityPassLoginButton"
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
