import {useCallback} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {useLogout} from '@/modules/city-pass/hooks/useLogout'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<CityPassRouteName.cityPassLogout>

export const LogoutScreen = ({navigation}: Props) => {
  const {setAlert} = useAlert()
  const logout = useLogout()
  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        setAlert({
          variant: AlertVariant.positive,
          text: 'Je Stadspas staat niet meer in de app. Je kunt je Stadspas altijd weer toevoegen door in te loggen.',
          title: 'Uitgelogd',
          hasIcon: true,
          hasCloseIcon: true,
          testID: 'CityPassLoggedOutAlert',
        })
        // navigate back, so the user does not open the logout screen directly when he logs in again
        navigation.goBack()
      })
      .catch(() => {
        setAlert({
          variant: AlertVariant.negative,
          text: 'Er is iets misgegaan. Probeer het opnieuw.',
          title: 'Uitloggen mislukt',
          hasIcon: true,
          hasCloseIcon: true,
          testID: 'CityPassLogoutFailedAlert',
        })
      })
  }, [logout, navigation, setAlert])

  const cancel = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <CityPassLoginBoundaryScreen testID="CityPassLogoutScreen">
      <Box>
        <Title text="Weet je zeker dat je wilt uitloggen?" />
        <Gutter height="sm" />
        <Paragraph>
          Als je meerdere passen hebt, worden die allemaal uitgelogd. Je kunt je
          Stadspas(sen) altijd weer toevoegen door in te loggen.
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
          onPress={onLogout}
          testID="CityPassLogoutButton"
          variant="primary"
        />
      </Box>
    </CityPassLoginBoundaryScreen>
  )
}
