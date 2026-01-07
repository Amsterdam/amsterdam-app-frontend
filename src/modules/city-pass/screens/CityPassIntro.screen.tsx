import {useEffect} from 'react'
import DigiD from '@/assets/icons/digid.svg'
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
import {useSelector} from '@/hooks/redux/useSelector'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import CityPassImage from '@/modules/city-pass/assets/city-pass.svg'
import {RequestCityPass} from '@/modules/city-pass/components/RequestCityPass'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

export const CityPassIntroScreen = () => {
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const removeSecureItems = useRemoveSecureItems()
  const login = useLogin()

  useEffect(() => {
    if (!isCityPassOwnerRegistered) {
      void removeSecureItems(
        [SecureItemKey.cityPassAccessToken, SecureItemKey.cityPassRefreshToken],
        false,
      )
    }
    // only remove secure items on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Log eenmalig in met DigiD en zet uw Stadspas in de app. Daarna kunt u
          de Stadspas offline gebruiken en laten scannen.
        </Paragraph>
        <Gutter height="lg" />
        <Column
          grow={1}
          gutter="md"
          halign="stretch">
          <Row gutter="sm">
            <Pressable
              onPress={login}
              testID="CityPassLoginDigiDButton">
              <DigiD />
            </Pressable>
            <Button
              flex={1}
              label="Inloggen met DigiD"
              onPress={login}
              testID="CityPassLoginButton"
            />
          </Row>
        </Column>
        <Gutter height="xl" />
        <RequestCityPass />
      </Box>
    </Screen>
  )
}
