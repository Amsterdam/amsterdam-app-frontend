import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {InformationButton} from '@/components/ui/buttons/InformationButton'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {PassOwners} from '@/modules/city-pass/components/PassOwners'
import {aboutBlocks} from '@/modules/city-pass/constants'
import {resetCityPass} from '@/modules/city-pass/slice'
import {devLog} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

export const DashboardScreen = () => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const logout = useCallback(() => {
    devLog('login')
    dispatch(resetCityPass())
    setAlert({
      variant: AlertVariant.positive,
      text: 'Je Stadspas staat niet meer in de app. Je kunt je Stadspas altijd weer toevoegen door in te loggen.',
      title: 'Uitgelogd',
      hasIcon: true,
      hasCloseIcon: true,
      testID: 'CityPassLoggedOutAlert',
    })
  }, [dispatch, setAlert])
  const openRedirect = useOpenRedirect()

  return (
    <CityPassLoginBoundaryScreen
      hasStickyAlert
      testID="CityPassDashboardScreen">
      <PassOwners logout={logout} />
      <Box
        insetHorizontal="md"
        insetVertical="xl"
        variant="city-pass">
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
    </CityPassLoginBoundaryScreen>
  )
}
