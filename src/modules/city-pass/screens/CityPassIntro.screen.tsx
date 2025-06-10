import {useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {useRemoveSecureItems} from '@/hooks/secureStorage/useRemoveSecureItems'
import CityPassImage from '@/modules/city-pass/assets/city-pass.svg'
import {RequestCityPass} from '@/modules/city-pass/components/RequestCityPass'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = NavigationProps<CityPassRouteName.login>

export const CityPassIntroScreen = ({navigation: {navigate}}: Props) => {
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const removeSecureItems = useRemoveSecureItems()

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
          de Stadspas gebruiken en laten scannen.
        </Paragraph>
        <Gutter height="lg" />
        <Column
          grow={1}
          gutter="md"
          halign="stretch">
          <Button
            label="Inloggen met DigiD"
            onPress={() => navigate(CityPassRouteName.loginSteps)}
            testID="CityPassLoginButton"
          />
        </Column>
        <Gutter height="xl" />
        <RequestCityPass />
      </Box>
    </Screen>
  )
}
