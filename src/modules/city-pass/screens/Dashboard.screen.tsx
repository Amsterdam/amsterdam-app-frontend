import {useCallback, useEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {InformationButton} from '@/components/ui/buttons/InformationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/city-pass/alerts'
import SportsImage from '@/modules/city-pass/assets/sports.svg'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {PassOwners} from '@/modules/city-pass/components/PassOwners'
import {aboutBlocks} from '@/modules/city-pass/constants'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {LoginResult} from '@/modules/city-pass/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {getValueFromUrlParam} from '@/utils/getValueFromUrlParam'

type Props = NavigationProps<CityPassRouteName.dashboard>

export const DashboardScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  const {loginResult} = route.params || {}
  const logout = useCallback(() => {
    navigation.navigate(CityPassRouteName.cityPassLogout)
  }, [navigation])
  const openRedirect = useOpenRedirect()

  useEffect(() => {
    if (loginResult === LoginResult.success) {
      dispatch(setIsCityPassOwnerRegistered(true))
      setAlert(alerts.loginSuccess)
    } else if (loginResult === LoginResult.failed) {
      dispatch(setIsCityPassOwnerRegistered(false))
      setAlert(alerts.retrievePassesFailed)
      trackException(ExceptionLogKey.deepLink, 'Dashboard.screen.tsx', {
        error:
          getValueFromUrlParam(loginResult, 'errorMessage') ??
          'Stadspas login niet gelukt.',
      })
    } else {
      // do nothing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult])

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
