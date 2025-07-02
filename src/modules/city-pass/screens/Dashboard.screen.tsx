import {useCallback} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {InformationButton} from '@/components/ui/buttons/InformationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {AutomaticLogoutAlert} from '@/modules/city-pass/components/AutomaticLogoutAlert'
import {PassOwners} from '@/modules/city-pass/components/PassOwners'
import {aboutBlocks} from '@/modules/city-pass/constants'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = NavigationProps<CityPassRouteName.dashboard>

export const DashboardScreen = ({navigation}: Props) => {
  const logout = useCallback(() => {
    navigation.navigate(CityPassRouteName.cityPassLogout)
  }, [navigation])
  const {openRedirect} = useOpenRedirect()

  return (
    <Screen testID="CityPassDashboardScreen">
      <AutomaticLogoutAlert />
      <PassOwners logout={logout} />
      <Box
        insetHorizontal="md"
        insetVertical="xl"
        variant="cityPass">
        <Column gutter="lg">
          <Title
            color="inverse"
            text="Over de Stadspas"
          />
          {aboutBlocks.map(({icon, title, text, testID, redirectKey}) => (
            <InformationButton
              accessibilityRole="link"
              iconName={icon}
              key={title}
              onPress={() => openRedirect(redirectKey)}
              testID={testID}
              text={text}
              title={title}
              variant="inverse"
            />
          ))}
        </Column>
      </Box>
      <Box
        insetBottom="md"
        insetHorizontal="md"
        insetTop="xl">
        <Button
          label="Uitloggen"
          onPress={logout}
          testID="CityPassLogoutButton"
          variant="secondary"
        />
      </Box>

      <FigureWithFacadesBackground testID="CityPassStartImage">
        <SportsImage />
      </FigureWithFacadesBackground>
    </Screen>
  )
}
