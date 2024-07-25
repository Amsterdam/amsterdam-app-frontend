import {useCallback} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {resetCityPass} from '@/modules/city-pass/slice'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<CityPassRouteName.cityPassLogout>

export const LogoutScreen = ({navigation}: Props) => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const logout = useCallback(() => {
    dispatch(resetCityPass())
    setAlert({
      variant: AlertVariant.positive,
      text: 'Je Stadspas staat niet meer in de app. Je kunt je Stadspas altijd weer toevoegen door in te loggen.',
      title: 'Uitgelogd',
      hasIcon: true,
      hasCloseIcon: true,
      testID: 'CityPassLoggedOutAlert',
    })
    // nvigate back, so the user does not open the logout screen directly when he logs in again
    navigation.goBack()
  }, [dispatch, navigation, setAlert])

  const cancel = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <CityPassLoginBoundaryScreen testID="CityPassLogoutScreen">
      <Box>
        <Title text="Weet je zeker dat je wilt uitloggen van de Stadspas in de app?" />
        <Gutter height="sm" />
        <Paragraph>
          Als je meerdere passen hebt, worden die allemaal uitgelogd. Je kunt je
          Stadspas altijd weer inloggen.
        </Paragraph>
        <Gutter height="xl" />
        <Button
          label="Annuleren"
          onPress={cancel}
          testID="CityPassLoginButton"
          variant="secondary"
        />
        <Gutter height="md" />
        <Button
          label="Uitloggen"
          onPress={logout}
          testID="CityPassLogoutButton"
          variant="primary"
        />
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
