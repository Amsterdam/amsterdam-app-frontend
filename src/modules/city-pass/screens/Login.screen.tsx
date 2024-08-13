import {useFocusEffect} from '@react-navigation/core'
import {useCallback, useEffect, useState} from 'react'
import DigiD from '@/assets/icons/digid.svg'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useAppState} from '@/hooks/useAppState'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import CityPassImage from '@/modules/city-pass/assets/city-pass.svg'
import {RequestCityPass} from '@/modules/city-pass/components/RequestCityPass'
import {cityPassExternalLinks} from '@/modules/city-pass/external-links'
import {useGetAccessToken} from '@/modules/city-pass/hooks/useGetAccessToken'

export const LoginScreen = () => {
  const [startLogin, setStartLogin] = useState(false)
  const openWebUrl = useOpenWebUrl()
  const loginUrl = useUrlForEnv(cityPassExternalLinks)

  const {secureAccessToken} = useGetAccessToken(startLogin) ?? {}
  const onFocus = useCallback(() => {
    setStartLogin(false)
  }, [])

  useFocusEffect(onFocus)
  useAppState({
    onForeground: onFocus,
  })

  useEffect(() => {
    if (secureAccessToken && startLogin) {
      openWebUrl(loginUrl + secureAccessToken) // Re-enters the app with a deeplink when finished
    }
  }, [openWebUrl, secureAccessToken, loginUrl, startLogin])

  const login = useCallback(() => {
    setStartLogin(true)
  }, [])

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
          </Column>
        </Row>
        <Gutter height="xl" />
        <RequestCityPass />
      </Box>
    </Screen>
  )
}
